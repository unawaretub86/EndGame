import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Card } from '@mui/material';
import * as React from 'react';



export default function CardTimeLineTwo({fase1, fase2, title}){
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
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color="secondary" />
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>{fase2}</TimelineContent>
                </TimelineItem>
            </Timeline>



        </Card>
    )
}