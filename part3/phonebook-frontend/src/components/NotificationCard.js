import React from "react";

const NotificationCard = ({ notification }) => {
    if (notification.type === null) {
        return null;
    }
    
    const notificationClassName = `notification-${notification.type}`;
    const notificationTitle = 
        ( notification.type === 'success' ) 
            ? 'Success!' 
            : ( notification.type === 'error' )
                ? 'Error!'
                : notification.type ;

    return (
        <div className={`notification-card ${notificationClassName}`} >
            <div className={'notification-title'} >{notificationTitle}</div>
            <div className={'notification-message'} >{notification.message}</div>
        </div>
    );
};

export default NotificationCard;