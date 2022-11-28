import React, { useState, useEffect, useRef, useContext } from "react";
import News from "./News/News";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { SearchContext } from "../../searchContext";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem } from "@mui/material";
import { fetchNews } from "../../api/api";
import Comments from "./comments/comments";

const styles = {
  box: {
    backgroundColor: "#f6f6ef",
    overflow: "hidden",
  },
  options: {
    display: "flex",
    flexDirection: "row",
    margin: "8px 0px 20px 27px",
    width: "80%",
    "& .MuiInputBase-root": {
      "& fieldset": {
        borderColor: "grey"
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(255, 102, 0)"
      },
    }
  },
  select: {
    margin: "0px 10px",
    width: "120px",
    height: "40px",
  },
  label: {
    margin: "0px 11px",
  },
  pagination: {
    width: "30%",
    margin: "auto",
    marginTop: "30px",
    marginBottom: "30px",
  },
};

let initialState = { sortedNewsByPoints: [], sortedNewsByDate: [] };
const Feed = () => {
  const abortController = React.useRef();

  const [searchState, setSearchState] = useContext(SearchContext);
  const [news, setNews] = useState(initialState);
  const [error, setError] = useState(false);

  const maxPage = useRef(1);
  const hitsPerPage = useRef(0);

  useEffect(() => {
    
    //canceling previous request if any 
    if(abortController.current){
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    fetchNews(searchState, signal)
      .then((data) => {
        maxPage.current = data.nbPages;
        hitsPerPage.current = data.hitsPerPage;
        let temp = structuredClone(data.hits);
        temp.sort((a, b) => {
          if (a.created_at_i < b.created_at_i) return 1;
          if (a.created_at_i > b.created_at_i) return -1;
          return 0;
        });
        
        let temp_ = structuredClone(data.hits); 

        temp_.sort((a,b)=>{
          if(a.points===null)return 1; 
          if(b.points===null)return -1;
          if(a.points>b.points)return -1;
          if(a.points<b.points)return 1; 
          return 0;
        })
        // console.log(data);
        let x = { sortedNewsByPoints: temp_, sortedNewsByDate: temp };
        setNews(x);
      })
      .catch((err) => {
        console.log(err);
        if(err.message!=='canceled')
          setError(true);
      });
  }, [searchState.time, searchState.page, searchState.type, searchState.query]);

  const handleSelectChange = (e) => {
    setSearchState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      page: 0,
    }));
  };

  const handlePageChange = (e, val) => {
    setSearchState((prevState) => ({
      ...prevState,
      page: val - 1,
    }));
  };

  const handleSortByChange = () => {
    // console.log("CALLED");
    setSearchState((prevState)=>({
      ...prevState,
      by:prevState.by==="Date"?"Popularity":"Date",
  }))

  };
  return error ? (
    <Box justifyContent="center" sx={{ marginTop: "50px" }}>
      Something Went Wrong Please Try Again or Reload the Page
    </Box>
  ) : (
    <Box sx={styles.box}>
      <Box sx={styles.options}>
        <div>
          <InputLabel sx={styles.label} id="search-label">
            Search
          </InputLabel>
          <Select
            labelId="search-label"
            name="type"
            value={searchState.type}
            label="Search"
            onChange={handleSelectChange}
            sx={styles.select}
            MenuProps={{
              disableScrollLock: true,
            }}
          >
            <MenuItem value={"All"} key={"1.1"}>
              All
            </MenuItem>
            <MenuItem value={"story"} key={"1.2"}>
              Stories
            </MenuItem>
            <MenuItem value={"comment"} key={"1.3"}>
              Comments
            </MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel sx={styles.label} id="by-label">
            Sort By
          </InputLabel>
          <Select
            labelId="by-label"
            name="by"
            value={searchState.by}
            label="by"
            sx={styles.select}
            MenuProps={{
              disableScrollLock: true,
            }}
            onChange={handleSortByChange}
          >
            <MenuItem value={"Popularity"} key={"2.1"}>
              Popularity
            </MenuItem>
            <MenuItem value={"Date"} key={"2.2"}>
              Date
            </MenuItem>
          </Select>
        </div>
        <div>
          <InputLabel sx={styles.label} id="time-label">
            Time
          </InputLabel>
          <Select
            labelId="time-label"
            name="time"
            value={searchState.time}
            label="time"
            sx={styles.select}
            MenuProps={{
              disableScrollLock: true,
            }}
            onChange={handleSelectChange}
          >
            <MenuItem value={"AllTime"} key={"3.1"}>
              All Time
            </MenuItem>
            <MenuItem value={"Last24h"} key={"3.2"}>
              Last 24h
            </MenuItem>
            <MenuItem value={"PastWeek"} key={"3.3"}>
              Past Week
            </MenuItem>
            <MenuItem value={"PastMonth"} key={"3.4"}>
              Past Month
            </MenuItem>
            <MenuItem value={"PastYear"} key={"3.5"}>
              Past Year
            </MenuItem>
          </Select>
        </div>
      </Box>
      {searchState.by === "Date"
        ? news.sortedNewsByDate.map((_data, idx) => (
            _data.comment_text===null?
            (<News
              key={_data.ObjectID||(Math.floor(Math.random()*100000)).toString()}
              obj={_data}
              index={searchState.page * hitsPerPage.current + idx + 1}
            />):
            (<Comments key={_data.ObjectID || (Math.floor(Math.random()*100000)).toString()} obj={_data}/>)
          ))
        : news.sortedNewsByPoints.map((_data, idx) => (
            _data.comment_text===null?
            (<News
              key={_data.ObjectID || (Math.floor(Math.random()*100000)).toString()}
              obj={_data}
              index={searchState.page * hitsPerPage.current + idx + 1}
            />):
            (<Comments key={_data.ObjectID || (Math.floor(Math.random()*100000)).toString()} obj={_data}/>)
          ))}
      <div
        style={{
          width: "100%",
          backgroundColor: "rgb(255, 102, 0)",
          height: "2px",
          marginTop: "30px",
        }}
      ></div>
      <Pagination
        style={styles.pagination}
        count={maxPage.current - 1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
        page={searchState.page + 1}
      ></Pagination>
    </Box>
  );
};

export default Feed;
