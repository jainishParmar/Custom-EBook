import * as React from 'react'
import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const array = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]
const BookList = () => {
  const handleCardClick = data => {
    console.log('inside')
  }

  const itemsPerPage = 8;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = array.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (event, value) => {
    setPage(value);
  };


  return (
    <div className='flex justify-center h-screen'>
      <div>
      <div className='m-3 grid  grid-cols-4 '>
        {currentItems.map((data, idx) => (
          <Card
            sx={{
              maxWidth: 345,
              margin: 2,
              '&:hover': {
                transform: 'scale(1.05)', // Scale the card slightly on hover
                transition: 'transform 0.3s ease-in-out' ,
                 cursor: 'pointer'
                // Smooth transition
              }
            }}
            key={idx}
            onClick={() => {
              handleCardClick(data)
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image='http://4.bp.blogspot.com/-4UB7EoORmD8/UzWi-cH_iRI/AAAAAAAACm0/xdiq_4oATCg/s1600/o-BALD-EAGLE-free.jpg'
              title='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Lizard
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <div className='flex justify-center'>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(array.length / itemsPerPage)}
            variant='outlined'
            color='primary'
            onChange={handlePageChange}
            page={page}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#1F2937', // text color
                borderColor: '#1F2937', // border color for outlined variant
              },
              '& .Mui-selected': {
                backgroundColor: '#1F2937',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#111827', // darker on hover
                },
              },
            }}
          />
        </Stack>
      </div>
      </div>
    </div>
  )
}

export default BookList
