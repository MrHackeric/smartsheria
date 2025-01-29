import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Avatar, IconButton, Badge } from "@mui/material";
import { ChatBubble, ThumbUp, AlternateEmail, PersonAdd } from "@mui/icons-material";

const notificationsData = {
  mentions: [
    { id: 1, avatar: "/images/avatar1.jpg", text: "@JohnDoe mentioned you in a comment.", time: "2h ago" },
    { id: 2, avatar: "/images/avatar2.jpg", text: "@JaneSmith tagged you in a post.", time: "5h ago" },
  ],
  replies: [
    { id: 3, avatar: "/images/avatar3.jpg", text: "Anna replied to your comment.", time: "1d ago" },
    { id: 4, avatar: "/images/avatar4.jpg", text: "Michael replied to your post.", time: "2d ago" },
  ],
  likes: [
    { id: 5, avatar: "/images/avatar5.jpg", text: "Sarah liked your comment.", time: "3h ago" },
    { id: 6, avatar: "/images/avatar6.jpg", text: "Tom liked your post.", time: "7h ago" },
  ],
  follows: [
    { id: 7, avatar: "/images/avatar7.jpg", text: "Alice started following you.", time: "4h ago" },
    { id: 8, avatar: "/images/avatar8.jpg", text: "David started following you.", time: "8h ago" },
  ],
};

const Notifications = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderNotifications = (notifications) => (
    <Box>
      {notifications.map((notification) => (
        <Box key={notification.id} className="flex items-center gap-4 p-4 border-b">
          <Avatar src={notification.avatar} alt="Avatar" />
          <div>
            <Typography variant="body1">{notification.text}</Typography>
            <Typography variant="caption" color="textSecondary">
              {notification.time}
            </Typography>
          </div>
          <IconButton>
            <Badge color="primary" variant="dot" />
          </IconButton>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-lg">
      <Box className="border-b">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            icon={<AlternateEmail />}
            label="Mentions"
            wrapped
          />
          <Tab
            icon={<ChatBubble />}
            label="Replies"
            wrapped
          />
          <Tab
            icon={<ThumbUp />}
            label="Likes"
            wrapped
          />
          <Tab
            icon={<PersonAdd />}
            label="Follows"
            wrapped
          />
        </Tabs>
      </Box>
      <Box className="p-4">
        {tabIndex === 0 && renderNotifications(notificationsData.mentions)}
        {tabIndex === 1 && renderNotifications(notificationsData.replies)}
        {tabIndex === 2 && renderNotifications(notificationsData.likes)}
        {tabIndex === 3 && renderNotifications(notificationsData.follows)}
      </Box>
    </Box>
  );
};

export default Notifications;
