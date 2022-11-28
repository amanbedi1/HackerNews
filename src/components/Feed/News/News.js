import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import moment from "moment";


const getDuration=(time)=>{
    const timeStamp = moment(time*1000); 
    return  timeStamp.fromNow();
}
const styles={
    outerBox:{
        marginTop:"20px",
    },
    belowRow:{
        marginLeft:"40px",
        marginTop:"-2px",
    },
    typography:{
        marginLeft:"40px",
        display:"inline",
        fontFamily:"Roboto Condensed', sans-serif",
    },
    subtitleTypography:{
        display:"inline",
        fontFamily:"Roboto Condensed', sans-serif",
        color:"#828282",
    }
}
const News = (props)=>{
    return (
        <Box sx={styles.outerBox}> 
            <Box className="above-row">
                {/* <span style={{color:"grey"}}>{props.index+". \u00A0"}</span> */}
                <Typography variant="body1" sx={styles.typography}>
                    {`${props.obj.title}`}
                </Typography>
            </Box>
            <Box sx={styles.belowRow}>
                <Typography variant="caption" sx={styles.subtitleTypography}>
                    {`${props.obj.points} points by ${props.obj.author} |\u00A0`}
                </Typography>
                <Typography variant="caption" sx={styles.subtitleTypography}>
                    {`${getDuration(props.obj.created_at_i)} | hide | past | discuss`}
                </Typography>
            </Box>
        </Box>
    )
}

export default News;