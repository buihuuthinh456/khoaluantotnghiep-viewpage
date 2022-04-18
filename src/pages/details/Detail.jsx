import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryPage, categoryPageAsync } from "../../features/categoryPage/categoryPageSlice";
import { useParams } from 'react-router-dom'

function CategoryPage() {

  const dispatch = useDispatch()
  const categoryPageState = useSelector(selectCategoryPage)

  const {category} = useParams()
  useEffect(()=>{
    dispatch(categoryPageAsync(category))
  }, [category] )

  if (categoryPageState.isLoading) return <h1>Loading</h1>
  return (
    <div>
      {console.log(categoryPageState.products)}
      hello
    </div>
  )
}

export default CategoryPage