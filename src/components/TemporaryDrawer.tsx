import { useState, KeyboardEvent, MouseEvent, Fragment } from 'react';
import { Box } from '@material-ui/core';
import {Drawer} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {List} from '@material-ui/core';
import {Divider} from '@material-ui/core';
import {ListItem} from '@material-ui/core';
import {ListItemIcon} from '@material-ui/core';
import {ListItemText} from '@material-ui/core';

import styled from 'styled-components'
import '../index.css'

import { TextField } from '@material-ui/core';

/* Sort[1] */
import { Select, SelectChangeEvent } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { FormControl } from '@material-ui/core'

type Anchor = 'bottom';

export const BoxItems = () => {
  const [rating, setRating] = useState('');

    const handleRating = (event: SelectChangeEvent) => {
      setRating(event.target.value);
  };

  return (
    <DrawerInfos>
      <DrawerActions>
        <DrawerTitle>FILTERS</DrawerTitle>
        <TextField sx={{ width: 112, mb: 2 }} label="€ Max"/>
        <TextField sx={{ width: 112, mb: 3 }} label="€ Min"/>
        <FormControl className="dev" sx={{ width: 136 }}>
          <InputLabel id="demo-simple-select-helper-label">RATING</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            value={rating}
            label="RATING"
            onChange={handleRating}
          >
            <MenuItem sx={{ fontSize: 14 }} value=">=1">1 and above</MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value='>=2'>2 and above</MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value='>=3'>3 and above</MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value='>=4'>4 and above</MenuItem>
          </Select>
        </FormControl>
      </DrawerActions>

      <DrawerButtons>
        <DrawerBtnPrimary>Clear</DrawerBtnPrimary>
        <DrawerBtnSecondary>Apply Filters</DrawerBtnSecondary>
      </DrawerButtons>
    </DrawerInfos>
  )
}


export const TemporaryDrawer = () => {
  const [state, setState] = useState<any>({
    bottom: false,
  });

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: any) => (
    <DrawerContainer>
      <Box className="box" sx={{ width: anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
        <DrawerClose onClick={toggleDrawer(anchor, false)}>X</DrawerClose>
        <BoxItems />
      </Box>
    </DrawerContainer>
  );

  return (
    <div>
      {
        ['bottom'].map((anchor: any) => (
          <Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>FILTERS</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </Fragment>
        ))
      }
    </div>
  );
}

export const DrawerTitle = styled.p`
  font-size: 14px;
  line-height: 16px;
  color:black;
`

export const DrawerClose = styled.p`
  font-size: 24px;
  font-weight: bold;

  position: absolute;
  top: 0;
  right: 0;
`

export const DrawerBtnPrimary = styled.button`
  font-size: 16px;
  font-weight: 600;
  color: #2264D1;
  height: 40px;
  width: 163px;
  background-color: transparent;
`

export const DrawerBtnSecondary = styled(DrawerBtnPrimary)`
  border: 1px solid #9DC2FF;
`

export const DrawerInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const DrawerActions = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;

`

export const DrawerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  
`

export const DrawerContainer = styled.div`
  position: relative;

  .box {
    height: 52vh;
  }

  ${DrawerClose} {
    margin-right: 24px;
    margin-top: 20px;
  }

  ${DrawerTitle} {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  ${DrawerButtons} {
    margin-right: 24px;
    margin-bottom: 24px;
  }
`