import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SPACING, FONTFAMILY } from '../constants/theme';
import { useAuth } from './auth/AuthContext';
// @ts-ignore
import { API_URL } from '@env';
import axios from 'axios';
import { NotificationSkeleton } from '../components/ui/skeletons';
import RedCircleIcon from '../../assets/SVG/RedDot';
import { useTheme } from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';
import EmptyNotficationDark from '../../assets/images/emptyState/EmptyNotification.png'
import EmptyNotficationLight from '../../assets/images/emptyState/EmptyNotificationLight.png'
import EmptyState from '../components/ui/EmptyState';

const NotificationStatus = ['unread', 'read' , 'dismissed' , 'archived' , 'action_taken'] as const

interface Notification {
  notification_created_at: string;
  notification_id: number;
  notification_message: string;
  notification_status: typeof NotificationStatus[number];
  notification_type: string; // You can expand types based on your use case
  notification_updated_at: string;
  notification_user_id: number;
}

const LIMIT_PER_PAGE = 10;
const SKELETON_COUNT = 6;

const NotificationsScreen: React.FC = () => {
  const { t } = useTranslation(["notifications"]);
  const { token, loggedIn, userId } = useAuth();
  const [totalNotifications, setTotalNotifications] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const {isDarkMode, theme} = useTheme();

  const fetchNotification = async (page: number, limit: number, isLoadingMore = false) => {
    try {
      if(isLoadingMore){
        setIsLoadingMore(true)
      }
      setLoading(true);
      const offset = (page - 1) * limit;
      const response = await axios.get(`${API_URL}/v1/users/${userId}/notifications?limit=${limit}&offset=${offset}&order_by=desc`, {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });

      if (response.status === 200) {
        if (page === 1) {
          setNotifications(response.data.notifications);
        } else {
          setNotifications(prevNotifications => [...prevNotifications, ...response.data.notifications]);
        }
        setTotalNotifications(response.data.metadata.count);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
      if(isLoadingMore){
        setIsLoadingMore(false)
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchNotification(1, LIMIT_PER_PAGE); // Fetch the first page on component load
    }
  }, [loggedIn]);

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    return (
      <View style={[styles.notificationWrapper, {backgroundColor: theme.secondaryBGColor}]}>
        {item.notification_status === 'unread' && <RedCircleIcon size={8} style={styles.redDotIcon} />}
        <Text style={[styles.notificationMessage, {color: theme.textColor}]}>{item.notification_message}</Text>
        <Text style={styles.notificationDate}>{new Date(item.notification_created_at).toLocaleString()}</Text>
      </View>
    );
  };

  const renderSkeletonItem = () => <NotificationSkeleton />;

  const loadMoreNotifications = () => {
    const maxPages = Math.ceil(totalNotifications / LIMIT_PER_PAGE);
    if (page < maxPages) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchNotification(nextPage, LIMIT_PER_PAGE, true);
        return nextPage;
      });
    }
  };

  const renderFooter = () => {
    return isLoadingMore ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primaryWhite}/>
      </View>
    ) : null;
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>
      {loading && page === 1 ? (
        <FlatList
          data={Array(SKELETON_COUNT).fill('')}
          renderItem={renderSkeletonItem}
          keyExtractor={(_, index) => `skeleton-${index}`}
        />
      ) : notifications.length > 0 ? (
        <>
          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={item => item.notification_id.toString()}
            onEndReached={loadMoreNotifications}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </>
      ) : (
        <EmptyState
          image={isDarkMode ? EmptyNotficationDark : EmptyNotficationLight}
          headerText={t('wallet:emptyTransaction')}
          bodyText={t('wallet:emptyTransactionDescription')}
          theme={theme}
          showButton={true}
          buttonText={t("notifications:reloadNotifications")}
          onPressButton={() => fetchNotification(1, LIMIT_PER_PAGE)}
        />
        // <View style={[styles.EmptyContainer, {backgroundColor: theme.primaryBGColor}]}>
        //   <Image
        //     source={isDarkMode ? EmptyNotficationDark : EmptyNotficationLight}
        //     style={styles.emptyStateImage}
        //     resizeMode="contain"
        //   />
        //   <Text style={[styles.emptyStateHeaderText, {color: theme.textColor}]}>{t("notifications:noNotificationsFound")}</Text>
        //   <Text style={styles.bodyText}>
        //     {t("notifications:noNotificationsFoundDescription")}
        //   </Text>
        //   <TouchableOpacity onPress={() => fetchNotification(1, LIMIT_PER_PAGE)} activeOpacity={0.7} style={styles.reloadBtn}>
        //     <Text style={[styles.reloadText, {color: theme.primaryBGColor}]}>{t("notifications:reloadNotifications")}</Text>
        //   </TouchableOpacity>
        // </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
  },
  notificationWrapper: {
    position: 'relative',
    backgroundColor: COLORS.secondaryBGColor,
    padding: SPACING.space_15,
    borderRadius: 12,
    borderColor: COLORS.borderStroke,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  redDotIcon: {
    position: 'absolute',
    left: 'auto',
    right: 10,
    top: 10
  },
  notificationMessage: {
    fontSize: 16,
    color: COLORS.primaryWhite,
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: COLORS.secondaryTextColor,
  },
  EmptyContainer: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBGColor,
    paddingHorizontal: SPACING.space_16,
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  emptyStateHeaderText: {
    fontSize: 20,
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_medium,
    marginBottom: 10,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    textAlign: 'center',
    marginBottom: SPACING.space_24,
  },
  reloadBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGoldHex,
    padding: 10,
    borderRadius: 10,
  },
  reloadText: {
    fontSize: 16,
    color: COLORS.primaryBGColor,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  loading: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationsScreen;
