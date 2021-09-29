import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
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
    Tabs,
    Tab
} from "@mui/material";
import { uniqueKey } from "../../stores/hooks";
import { ThemeProvider } from '@mui/material/styles';
import { LoginTyTheme } from '../styles/common';

import {
    FIND_ALL_QUESTIONS,
} from "../../stores/soGql";

export const QuestionTabContainer = (props) => {
    const [dataList, setDataList] = useState([])
    const { loading, error, data, refetch, fetchMore } = useQuery(
        FIND_ALL_QUESTIONS,
        {
            context: {
                headers: {
                    isPrivate: false,
                },
            },
            onError: (err) => { console.log(`QuestionTabContainer useQuery onError ${err}`) },
            onCompleted: (res) => {
                //   console.log(`useQuery onCompleted ${JSON.stringify(res)}`)
                setDataList(res.questions)
            },
        },

    );
    useEffect(() => {
        console.log(`QuestionTabContainer constructor dataList update`)
    }, [dataList])

    return (
        <QuestionTabView data={dataList} />

    )
}

const LayOutContainer = { position: 'relative', minWidth: "50vw", minHeight: "60vh", }
const debugStyle = { border: '#a3a8d2', maxHeight: '80vh', maxWidth: "50vw", overflow: 'auto' }
const GridStyle = { border: '#a3a8d2', maxHeight: '80vh', minWidth: "60vw", overflow: 'auto', paddingTop: '4px' }

const QuestionTabView = (props) => {
    return (
        <Box style={LayOutContainer}>
            <Grid style={GridStyle}
                sx={{
                    rowGap: 0.4,
                    scrollbarColor: "#110b6c  #ebf7f7",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        backgroundColor: "#f1f1f1",
                        width: "20px",
                    },
                }}
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >

                {props.data.map((elem) => (
                    <Grid container key={uniqueKey()} >
                        <Grid item xs={12} key={uniqueKey()}>
                            <Paper elevation={3} >
                                <Card>
                                    <CardHeader
                                        avatar={<Avatar src={elem.owner.profileImage} />}
                                        title={ elem.owner.displayName }
                                        titleTypographyProps={{
                                            variant: "h6", component: "span", align: "left", color:'#bb002f'
                                        }} />

                                    <CardContent>
                                        <Link
                                            sx={{ 
                                                textDecoration: 'none',
                                                '& :hover': {
                                                    color: '#ff5983',
                                                  },}}
                                            href={elem.link}>
                                            <ThemeProvider theme={LoginTyTheme}>
                                                <Typography
                                                    sx={{ color: '#8e99f3' }}
                                                    variant="h6" gutterBottom>
                                                    {`${elem.title}`}
                                                </Typography>
                                            </ThemeProvider>
                                        </Link>
                                        <ThemeProvider theme={LoginTyTheme}>
                                            <Typography
                                                sx={{ color: '#001970' }}
                                                variant="h7" gutterBottom>
                                                {`tags ${elem.tags}`}
                                            </Typography>
                                            <Box
                                              sx={{ color: '#001970' }}
                                            >
                                                <Typography variant="h7" gutterBottom>
                                                    {`score:  `}

                                                </Typography>

                                                <Typography
                                                  sx={{ color: '#bb002f' }}
                                                variant="h7" gutterBottom>
                                                    { elem.score}

                                                </Typography>
                                            </Box>
                                            <Box
                                              sx={{ color: '#001970' }}
                                            >
                                            <Typography variant="h7" gutterBottom>
                                                {`created:  `}
                                            </Typography>
                                            <Typography variant="h7" gutterBottom
                                                  sx={{ color: '#bb002f' }}>
                                                {`    ${new Date(elem.creationDate).toUTCString()}` }
                                            </Typography>
                                            </Box>
                                        </ThemeProvider>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}