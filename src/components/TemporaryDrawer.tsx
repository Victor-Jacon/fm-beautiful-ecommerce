import React, { useState, KeyboardEvent, MouseEvent, Fragment } from 'react';
import { Box } from '@material-ui/core';
import {Drawer} from '@material-ui/core';
import {Button} from '@material-ui/core';

import styled from 'styled-components'
import '../index.css'

import { TextField } from '@material-ui/core';

/* Sort[1] */
import { Select, SelectChangeEvent } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { FormControl } from '@material-ui/core'

// misc
// import { ProductContext } from '../providers/product'

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

  // Filter
  const [rating, setRating] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [minValue, setMinValue] = useState('');

  const handleRating = (event: SelectChangeEvent) => setRating(event.target.value);
  const handleMaxValue = (e: any) => setMaxValue(e.target.value)
  const handleMinValue = (e: any) => setMinValue(e.target.value)

  const clearFilter = () => {
    setRating('');
    setMaxValue('');
    setMinValue('');
  }

  // FILTERS
  const [productList, setProductList] = useState([
    {
       "id":"70788059",
       "title":"Forest Gump Shoes",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297575-image1.png?fm=jpg"
       },
       "description":"amazing forest gump shoes",
       "rating":2,
       "price":13.48
    },
    {
       "id":"70780958",
       "title":"Charger (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297560-image4.png?fm=jpg"
       },
       "description":"Charge your phone with a passport-charger hibrid. The amazon choice for digital nomads.",
       "rating":4.5,
       "price":16.48
    },
    {
       "id":"70780948",
       "title":"Gift (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297552-image5.png?fm=jpg"
       },
       "description":"Random gift, can be a 200 reais bill, who knows?",
       "rating":4.75,
       "price":17.48
    },
    {
       "id":"70780962",
       "title":"Drink (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297565-image3.png?fm=jpg"
       },
       "description":"Mate, the best for your coding nights",
       "rating":4,
       "price":15.48
    },
    {
       "id":"70780969",
       "title":"Typewriter (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297570-image2.png?fm=jpg"
       },
       "description":"A typewriter will help you write better typescript, 50% off today...",
       "rating":3,
       "price":14.48
    },
    {
       "id":"70780976",
       "title":"Miscellaneous (duplicate)",
       "productImage":{
          "url":"https://www.datocms-assets.com/58030/1636297581-image.png?fm=jpg"
       },
       "description":"Amazing unknown misc products",
       "rating":1,
       "price":12.48
    }
  ]);

  const filterProducts = (productList: any, rating?: any, maxValue?: any, minValue?: any) => {
    // How's data arriving?
    // console.log(productList);
    // console.log(rating, maxValue, minValue);
    // console.log(typeof minValue; typeof maxValue);

    // How's new data structure now?
    const minValueNumber = Number(minValue);
    const maxValueNumber = Number(maxValue);
    // console.log(typeof minValueNumber, typeof maxValueNumber, typeof rating);

    const filterRating = (productList: any) => {
      // is data arriving as expected?
      // console.log(typeof productList.rating, productList.rating);
      // console.log(typeof rating, rating);

      if(Number(productList.rating) >= rating) return true    
    }

    const filterValue = (productList: any) => {
      if(Number(productList.price) >= minValueNumber && Number(productList.price) <= maxValueNumber) {
        return true
      }
    }

    if (rating && minValue | maxValue) {
      const filteredByRatingAndValue = productList
        .filter(filterValue)
        .filter(filterRating)

      // console.log('rating and value')
      // console.log(filteredByRatingAndValue)
      return filteredByRatingAndValue
    }

    if (rating) {
      const filteredByRating = productList.filter(filterRating)
      // console.log('rating')
      // console.log(filteredByRating)
      return filteredByRating
    }

    if (minValue | maxValue) {
      const filteredByValue = productList.filter(filterValue)
      // console.log('value')
      // console.log(filteredByValue)
      return filteredByValue
    }

    return productList
  }

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
              <DrawerContainer>
                <Box className="box" sx={{ width: anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
                  <DrawerClose onClick={toggleDrawer(anchor, false)}>X</DrawerClose>
                  <DrawerInfos>
                    <DrawerActions>
                      <DrawerTitle>FILTERS</DrawerTitle>
                      <TextField type="number" value={maxValue} onChange={(e: any)=> handleMaxValue(e)} id="max-value" sx={{ width: 112, mb: 2 }} label="€ Max"/>
                      <TextField type="number" value={minValue} onChange={(e: any)=> handleMinValue(e)} id="min-value" sx={{ width: 112, mb: 3 }} label="€ Min"/>
                      <FormControl sx={{ width: 136 }}>
                        <InputLabel id="demo-simple-select-helper-label">RATING</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={rating}
                          label="RATING"
                          onChange={handleRating}
                        >
                          <MenuItem sx={{ fontSize: 14 }} value="1">1 and above</MenuItem>
                          <MenuItem sx={{ fontSize: 14 }} value='2'>2 and above</MenuItem>
                          <MenuItem sx={{ fontSize: 14 }} value='3'>3 and above</MenuItem>
                          <MenuItem sx={{ fontSize: 14 }} value='4'>4 and above</MenuItem>
                        </Select>
                      </FormControl>
                    </DrawerActions>

                    <DrawerButtons>
                      <DrawerBtnPrimary onClick={() => clearFilter()}>
                        Clear
                      </DrawerBtnPrimary>
                      <DrawerBtnSecondary onClick={() => filterProducts(productList, rating, maxValue, minValue) }>
                        Apply Filters
                      </DrawerBtnSecondary>
                    </DrawerButtons>
                  </DrawerInfos>
                </Box>
              </DrawerContainer>
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