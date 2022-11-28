import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import moment from "moment";


const getDuration=(time)=>{
    const timeStamp = moment(time*1000); 
    return  timeStamp.fromNow();
}

const Comments = (props)=>{
    return(
        <Box sx={{margin:"20px 40px"}}>
            {/* <span style={{color:"#828282" }}>{props.index}</span> */}
            <Typography variant="caption" sx={{fontFamily:"Roboto Condensed', sans-serif",color:"#828282"}}>
            {`${props.obj.author} | ${getDuration(props.obj.created_at_i)} | parent | on:${props.obj.story_title}`}
            </Typography>
            <Typography variant="caption" component="p" sx={{fontFamily:"Roboto Condensed', sans-serif",color:"black"}}>
                {props.obj.comment_text}
            </Typography>
        </Box>
    )
}
export default Comments;