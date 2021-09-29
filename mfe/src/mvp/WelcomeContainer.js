import React, { useContext, useEffect, useState } from 'react';
import { WelcomeSlotContainer } from './styles/common';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Link,
    Avatar,
    Paper,
    AppBar,
    Tabs,
    Tab
} from "@mui/material";

import { TabPanel } from './tabs/tab-panels'
import { PostTabContainer } from './tabs/PostTab'
import { QuestionTabContainer } from './tabs/QuestionTab'

export const WelcomeContainer = (props) => {
    return (
        <WelcomeView />
    )
}

const WelcomeView = (props) => {
    const [value, setValue] = useState(0);
    const tabStyles = {
        boxShadow: 'none',
        backgroundColor: 'white',
        padding: '2px',
        position: 'relative',
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const debugStyle = { border: '2px solid red' }

    return (
        <WelcomeSlotContainer >
            <Box sx={{ width: '100%', marginTop: '4%' }} >
                <Tabs
                    sx={{
                        width: '100%',
                        "& .MuiTabs-indicator": {
                            display: "none",
                        },

                        "& .MuiTab-wrapper": {
                            color: `#00D100`,
                        },

                        "& .Mui-selected .MuiTab-wrapper": {
                            textDecoration: "underline",
                            color: '#e91e63',
                        },

                        "&  .MuiTab-wrapper": {
                            border: `1px solid #a3a8d2`,
                            borderRadius: '6px',
                        },

                        "&  .MuiTab-wrapper:hover": {
                            border: "1px solid blue",
                            backgroundColor: '#1f35e6',
                            borderRadius: '6px',
                        },
                    }}
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    <Tab label="Latest Questions" {...a11yProps(0)} sx={{ 
                        fontSize: {xs:'0.6rem', sm:'1rem', md:'1.41rem'} }} />
                    <Tab label="Latest Posts" {...a11yProps(1)} sx={{ 
                        fontSize: {xs:'0.6rem', sm:'1rem', md:'1.41rem'} }} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <QuestionTabContainer />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PostTabContainer />
                </TabPanel>
            </Box>
        </WelcomeSlotContainer>
    )
}
