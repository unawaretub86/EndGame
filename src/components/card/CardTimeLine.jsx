import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Card } from '@mui/material';
import * as React from 'react';



export default function CardTimeLine({title, fase1}){
    return(
        <Card sx={{minWidth:275}}>
            <h3>{title}</h3>
            <Timeline position="alternate">
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color="error" />
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>{fase1}</TimelineContent>
                </TimelineItem>
            </Timeline>



        </Card>
    )
}