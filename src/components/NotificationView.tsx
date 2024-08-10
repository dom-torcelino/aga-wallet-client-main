/* eslint-disable prettier/prettier */
import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useAuth } from '../screens/auth/AuthContext';
import TransactionSkeleton from './ui/TransactionSkeleton';
import BackButton from './ui/backButton';
// @ts-ignore
import { API_URL } from '@env';
import axios from 'axios';

const NotificationView: React.FC = () => {
    const { token, loggedIn } = useAuth();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const skeletonCount = 8;

    useEffect(() => {
        let isMounted = true;

        const fetchNotification = async () => {
            if(loggedIn) {
                try{
                    const response = await axios.get(`${API_URL}/v1/notifications`,{
                        headers: {
                            Authorization: `Bearer ${token?.accessToken}`,
                          },
                    });
                    if (isMounted && response.status === 200) {
                        setNotifications(response.data.notifications);
                    }
                } catch (error) {
                    if (isMounted) {
                      console.error('Error fetching notification:', error);
                    }
                } finally {
                    if (isMounted) {
                      setLoading(false);
                    }
                }
            }
        };

        fetchNotification();

        return () => {
            isMounted = false;
        };
    }, [token, loggedIn]);

    const renderNotificationItem = ({ item }: { item: any }) => (
        <View style={styles.notificationWrapper}>
            <Text style={styles.notificationMessage}>{item.notification_message}</Text>
            <Text style={styles.notificationDate}>{new Date(item.notification_created_at).toLocaleString()}</Text>
        </View>
    );

    const renderSkeletonItem = () => (
        <TransactionSkeleton />
    );

  return (
    <View style={styles.container}>
        <BackButton/>
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
            <Text style={styles.noNotificationText}>No notifications available.</Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBGColor,
        padding: 20,
    },

    notificationWrapper: {
        backgroundColor: COLORS.secondaryBGColor,
        padding: SPACING.space_15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderStroke,
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
    // backButtonContainer: {
    //     borderRadius: BORDERRADIUS.radius_25,
    //     overflow: 'hidden',
    //     backgroundColor: COLORS.secondaryBGColor,
    //     padding: 6,
    // },
    // backButton: {
    //     marginRight: 2,
    // },
});

export default NotificationView;
