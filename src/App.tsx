import React, { useState, useEffect, KeyboardEvent, MouseEvent, Fragment } from 'react';
import styled from 'styled-components'
import './index.css'

/* Other libs and icons */
import { BsSearch } from 'react-icons/bs'
import Hamburger from 'hamburger-react'

/* Filter + Context */
import { TemporaryDrawer } from './components/TemporaryDrawer';
import { FilterContext, FilterContextType, SortContext, SortContextType } from './providers/sort'

/* Sort[1] */
import { Select, SelectChangeEvent } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { FormControl } from '@material-ui/core'

// Closes: TemporaryDrawer

/* Material UI */
import { Stack } from '@material-ui/core' // base container
import { Rating } from '@material-ui/core'
import { Pagination } from '@material-ui/core' // [Pag 1]

/* DATO CMS */
import { useQuery } from "graphql-hooks";
const PRODUCTS_QUERY = 
  `query 

    Products(
      $first: IntType, 
      $skip: IntType, 
      $orderBy: ProductModelOrderBy,
      $minRating: FloatType,
      $minPrice: FloatType,
      $maxPrice: FloatType,
    ) 

    {

      allProducts(
        first: $first, 
        skip: $skip,
        orderBy: [$orderBy],
        filter: {
          rating: { gte: $minRating},
          price: { gte: $minPrice, lte: $maxPrice },
        }
      ) 

        {
          id
          title
          productImage {
            url(imgixParams: {fm: jpg })
          }
          description
          rating
          price
        }

    }`;

const App = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // [Context]
    const { sort, setSort } = React.useContext(SortContext) as SortContextType; // [Context 5]
    const handleSorting = (event: SelectChangeEvent) => setSort(event.target.value);

  /* Card */
    const [qty, setQty] = useState('1');
    const handleQty = (event: SelectChangeEvent) => setQty(event.target.value);

  /* DATO CMS + Pagination */
    const [skipCount, setSkipCount] = useState(0) 
    const [objsPerPage, setObjsPerPage] = useState(6) // there are 14 objects. It should return 2 pages with 6 + 1 page with 1.
    const [currentPage, setCurrentPage] = useState(1)

  // Filter
    const { maxPriceFilter, setMaxPriceFilter } = React.useContext(FilterContext) as FilterContextType;
    const { minPriceFilter, setMinPriceFilter } = React.useContext(FilterContext) as FilterContextType;
    const { minRatingFilter, setMinRatingFilter } = React.useContext(FilterContext) as FilterContextType; 

  // DatoCMS Query
    const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
      variables: {
        first: objsPerPage, // How many objects to return
        skip: skipCount, // Offset at which to start
        orderBy: sort, // what sort will be used
        minRating: minRatingFilter,
        minPrice: minPriceFilter,
        maxPrice: maxPriceFilter,
      }
    });

  // QA
    if (error) return <div>There was an error!</div>
    if (loading && !data) return <div>Loading</div>

  // saving query data to variable +/ creating pagination logic
  const { allProducts, _allProductsMeta } = data

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    const newValue = value - 1;
    const newSkip = newValue * objsPerPage;
    setSkipCount(newSkip);
    // [code pagination] neste momento o useQuery executa novamente e salva dentro de allProducts o novo valor. Se eu passar um setProducts do state, ele não atualiza.
  }

  return (
    <Container id="container">

      <Header>
        <SearchBar id="search-bar">
          <SearchInput id="search-input"/>
          <SearchButton id="search-button" type="submit">
            <BsSearch />
          </SearchButton>
        </SearchBar>

        <Hamburger size={18} toggled={hamburgerOpen} toggle={() => setHamburgerOpen(!hamburgerOpen)} />
      </Header>

      <FilterContainer>
        <FormControl sx={{ width: 164 }} id="form-control">
          <InputLabel id="sort-by demo-simple-select-helper-label">SORT BY</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            value={sort}
            label="SORT BY"
            onChange={handleSorting}
          >
          <MenuItem sx={{ fontSize: 14 }} value="rating_DESC">Rating</MenuItem>
          <MenuItem sx={{ fontSize: 14 }} value="price_DESC">Price</MenuItem>
          </Select>
        </FormControl>

        <FilterActions>
          <TemporaryDrawer />
        </FilterActions>
      </FilterContainer>

      <CardContainer>
        { allProducts?.map((product: any, key: any) => (
          <Card key={product.id} onClick={() => console.log(product)}>
            <CardImage src={product.productImage.url} />
            <CardParagraph>{product.description}</CardParagraph>
            <RatingInfos>
              <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
              </Stack>
              <RatingText>{product.rating}</RatingText>
            </RatingInfos>
            <PurchaseContainer id="purchase-container">
              <Price>${product.price}</Price>
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
            <CardButton >Add to Cart</CardButton>
          </Card>
        )) }
      </CardContainer>

      <PaginationContainer>
        <Stack spacing={2}>
          <Pagination count={6} color="primary" page={currentPage} onChange={handlePage}/>
        </Stack>
      </PaginationContainer>

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
  height: 40px;
  width: 40px;

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
  height: 105px;
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

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`

/* Opens: TemporaryDrawer */

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

/* Closes: TemporaryDrawer*/

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

  ${PaginationContainer} {
    margin-top: 24px;
    margin-bottom: 36px;
  }
`

export default App;
