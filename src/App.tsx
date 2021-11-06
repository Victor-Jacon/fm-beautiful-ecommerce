import styled from 'styled-components'
import { BsSearch } from 'react-icons/bs'
import Hamburger from 'hamburger-react'
import { useState } from 'react'
import './index.css'

/* Sort[1] */
import { Select, SelectChangeEvent } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { FormControl } from '@material-ui/core'

/* Filter */
import { TemporaryDrawer } from './components/TemporaryDrawer';

/* Rating */
import { Rating } from '@material-ui/core'
import { Stack } from '@material-ui/core'

/* images */
// import Miscellaneous from '../produtos/image.png';
// import Shoes from '../produtos/image1.png';
// import Typewriter from '../produtos/image2.png';
// import Drink from '../produtos/image3.png';
// import Charger from '../produtos/image4.png';
// import Gift from '../produtos/image5.png';

const App = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const [sort, setSort] = useState('');
  const handleSorting = (event: SelectChangeEvent) => setSort(event.target.value);

  /* Product */
  const productInfo = [
    {
      "title": "Miscellaneous",
      "image": '../produtos/image.png', // to search the image dynamically it needs to be in the public folder (which is ommited here) instead of doing ..public/produtos, we do ../produtos (it already considers we are inside the public folder)
      "description": "This is a long title name containing lots of words",
      "rating": 1,
      "price": 12.48,
    },
    {
      "title": "Shoes",
      "image": '../produtos/image1.png', 
      "description": "This is a long title name containing lots of words",
      "rating": 2,
      "price": 13.48,
    },
    {
      "title": "Typewriter",
      "image": '../produtos/image2.png', 
      "description": "This is a long title name containing lots of words",
      "rating": 3,
      "price": 14.48,
    },
    {
      "title": "Drink",
      "image": '../produtos/image3.png', 
      "description": "This is a long title name containing lots of words",
      "rating": 4,
      "price": 15.48,
    },
    {
      "title": "Charger",
      "image": '../produtos/image4.png', 
      "description": "This is a long title name containing lots of words",
      "rating": 4.5,
      "price": 16.48,
    },
    {
      "title": "Gift",
      "image": '../produtos/image5.png', 
      "description": "This is a long title name containing lots of words",
      "rating": 4.75,
      "price": 17.48,
    },
  ]

  /* Card */
  const [qty, setQty] = useState('1');
  const handleQty = (event: SelectChangeEvent) => setQty(event.target.value);

  return (
    <Container id="container" className="dev">

      <Header className="dev">
        <SearchBar id="search-bar">
          <SearchInput id="search-input"/>
          <SearchButton id="search-button" type="submit">
            <BsSearch />
          </SearchButton>
        </SearchBar>

        <Hamburger size={18} toggled={hamburgerOpen} toggle={() => setHamburgerOpen(!hamburgerOpen)} />
      </Header>

      <FilterContainer>
        <FormControl className="dev" sx={{ width: 164 }}>
          <InputLabel id="demo-simple-select-helper-label">SORT BY</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            value={sort}
            label="SORT BY"
            onChange={handleSorting}
          >
            <MenuItem sx={{ fontSize: 14 }} value="rating">Rating</MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value='price'>Price</MenuItem>
          </Select>
        </FormControl>

        <FilterActions className="dev">
          <TemporaryDrawer />
        </FilterActions>
      </FilterContainer>

      <CardContainer>
        { productInfo.map((product: any, index: any) => (
          <Card>
            <CardImage src={productInfo[0].image} onClick={() => console.log(product[index].image)} />
            <CardParagraph>This is a long title name containing lots of words</CardParagraph>
            <RatingInfos className="dev">
              <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
              </Stack>
              <RatingText>2.5</RatingText>
            </RatingInfos>
            <PurchaseContainer className="dev" id="purchase-container">
              <Price>$12.48</Price>
              <FormControl sx={{ width: 60  }}>
                <InputLabel id="demo-simple-select-helper-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  value={qty}
                  label="quantity"
                  onChange={handleQty}
                >
                  <MenuItem sx={{ fontSize: 14 }} value="1">1</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }} value='2'>2</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }} value='3'>3</MenuItem>
                </Select>
              </FormControl>
            </PurchaseContainer>
            <CardButton className="dev">Add to Cart</CardButton>
          </Card>
        )) }
      </CardContainer>

    </Container>
  );
}

export const Row = styled.div`
  
`

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const SearchBar = styled.div`
  display: flex;
  position: relative;

  /* dev */
  border: none;
`

export const SearchInput = styled.input`

  /* dev */
  width: 291px;
  height: 40px;

  display: flex;
  background-color: #EDEDF0;
  outline: none;
  border-radius: 4px;
  border: 1px solid #EDEDF0;

  color: #19191D;
  /* dev */
  padding-left: 16px; 
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
`

export const SearchAction = styled.div`
`

export const SearchButton = styled.button`
  height: 42px;
  width: 42px;

  cursor: pointer;
  outline: none;
  border: none;
  color: black;
  font-size: 16px;

  position: absolute;
  right: 0;

  svg {
    width: 20px;
    height: 20px;
    color: #787885;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;

  background-color: #F9F9F9;
  height: 72px; /* dev */

  align-items: center;
  justify-content: space-between;
`

export const FilterActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px; /* dev */
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #F0F0F0;
  flex-basis: 30%;
  padding: 8px;

  align-items: center;
`

interface CardProps {
  src?: any,
}

export const CardImage = styled.img<CardProps>`
  width: 158px;
  height: 145px;
`

export const CardParagraph = styled.p`
  font-size: 14px;
  line-height: 21px;
`

export const RatingInfos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const RatingText = styled.p`
  font-size: 14px;
  line-height: 22px;
`

export const Price = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color:#000000DE;
`

export const PurchaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  fieldset {
    border: 0px;
  }
`

export const CardButton = styled.button`
  width: 100%;
  height: 36px;
  border: 1px solid #F0F0F0;
  border-radius: 4px;
  background-color: transparent;

  font-size: 14px;
  line-height: 20px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .dev {
    border: 1px dashed red;
  }

  .menu-item {
    font-size: 14px;
  }

  /* POSITIONING */
  ${Header} {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  ${SearchBar} {
    margin-right: 32px;
  }

  ${FilterContainer} {
    margin-left: 16px;
    margin-right: 16px;
  }

  /* Card */
  ${Card} {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  ${CardParagraph} {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  ${RatingInfos} {
    margin-bottom: 16px;
  }

  ${RatingText} {
    margin-left: 8px;
  }

  ${PurchaseContainer} {
    margin-bottom: 24px;
  }

  ${CardButton} {
    margin-bottom: 16px;
  }
`

export default App;
