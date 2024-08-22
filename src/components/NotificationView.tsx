import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SPACING, FONTFAMILY} from '../constants/theme';
import {useAuth} from '../screens/auth/AuthContext';
import TransactionSkeleton from './ui/TransactionSkeleton';
import BackButton from './ui/BackButton';
// @ts-ignore
import {API_URL} from '@env';
import axios from 'axios';
import {useTheme} from '../utils/ThemeContext';
import EmptyNotficationDark from '../../assets/images/emptyState/EmptyNotification.png'
import EmptyNotficationLight from '../../assets/images/emptyState/EmptyNotificationLight.png'


const NotificationView: React.FC = () => {
  const {token, loggedIn} = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const skeletonCount = 8;
  const {theme, isDarkMode} = useTheme();

  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${API_URL}/v1/notifications`, {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });

      if (response.status === 200) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notification:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (loggedIn && isMounted) {
      fetchNotification();
    }

    return () => {
      isMounted = false;
    };
  }, [token, loggedIn]);

  const renderNotificationItem = ({item}: {item: any}) => (
    <View style={styles.notificationWrapper}>
      <Text style={styles.notificationMessage}>
        {item.notification_message}
      </Text>
      <Text style={styles.notificationDate}>
        {new Date(item.notification_created_at).toLocaleString()}
      </Text>
    </View>
  );

  const renderSkeletonItem = () => <TransactionSkeleton />;

  const handleReloadNotifications = () => {
    setLoading(true);
    setNotifications([]);
    fetchNotification(); // Re-fetch notifications when reload button is pressed
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>
      <View style={styles.backButton}>{/* <BackButton /> */}</View>
      {loading ? (
        <FlatList
          data={Array(skeletonCount).fill('')}
          renderItem={renderSkeletonItem}
          keyExtractor={(_, index) => `skeleton-${index}`}
        />
      ) : notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.notification_id.toString()}
        />
      ) : (
        <View style={styles.EmptyContainer}>
          <Image
            source={isDarkMode ? EmptyNotficationDark : EmptyNotficationLight}
            style={styles.emptyStateImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyStateHeaderText}>
            No notifications found
          </Text>
          <Text style={styles.bodyText}>
            You currently have no notifications. {'\n'}Check back later for
            updates.
          </Text>
          <TouchableOpacity
            onPress={handleReloadNotifications}
            activeOpacity={0.7}
            style={styles.reloadBtn}>
            <Text style={[styles.reloadText, {color: theme.primaryBGColor}]}>Reload Notifications</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    paddingVertical: 10,
  },
  backButton: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationWrapper: {
    backgroundColor: COLORS.secondaryBGColor,
    padding: SPACING.space_15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    marginHorizontal: 10,
    marginBottom: 10,
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
  noNotificationText: {
    fontSize: 16,
    color: COLORS.primaryWhite,
    textAlign: 'center',
    marginTop: 20,
  },
  EmptyContainer: {
    flex: 1,
    justifyContent: 'center',
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
});

export default NotificationView;
