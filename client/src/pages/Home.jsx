import React, {useState, useEffect} from 'react'
import {Card, Loader, FormField} from '../components'


const RenderCards = ({data, title}) => {
  if(data?.length > 0) return data.map((post) => {
    return <Card key={post._id} {...post} />
  })
  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false)
  const  [allposts, setAllPosts] = useState(null)

  const [searchText, setSearchText] = useState("")
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          'Content-Type': 'application/json',
        })

        if(response.ok){
          const result = await response.json()
          setAllPosts(result.data.reverse())
        }
      } catch (error) {
        alert(error)
      }finally{
        setLoading(false)
      }
    }

    fetchPost()
  },[])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchFilter = allposts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
        setSearchedResults(searchFilter);
      },500)
    )
    
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328]'>
          The Showcase for AI Generated Images
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>Browse through a collection of images generated using by <span className='text-cyan-300 font-bold'>OpenAI</span>.</p>
      </div>
      <div className='mt-16'>
        <FormField
          labelName="Search Post"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader/>
          </div>
        ) : (
          <>
            {
              searchText && (
                <h2 className='text-[666e75] text-xl mb-3'>Showing results for <span className='text-[#222328] font-bold'>{searchText}</span></h2>
              )
            }
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {
                searchText ? (
                  <RenderCards data={searchedResults} title="No result found" />
                ) : (
                  <RenderCards data={allposts} title="No posts found"/>
                )
              }
            </div>
          </>
        )
          
        }
      </div>
    </section>
  )
}

export default Home