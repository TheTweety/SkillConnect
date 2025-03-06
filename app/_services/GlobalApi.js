const {gql, request} = require("graphql-request");
const Master_URL='https://us-west-2.cdn.hygraph.com/content/'+process.env.NEXT_PUBLIC_MASTER_URL_KEY+'/master'

const getCategory=async()=>{
    const query=gql`
        query Category {
            categories {
               bgcolor {
                 hex
               }
               id
               name
               icon {
                 url
               }
            }
         }
        `

     const result=await request(Master_URL,query)
    return result
}

const getAllBusinessList=async()=>{
    const query=gql`
    query BusinessList {
      businessLists {
        about
        address
        category {
          name
        }
        contactPerson
        email
        images {
          url
        }
        id
        name
      }
    }
    `
    const result=await request(Master_URL,query)
    return result
}
export default{
    getCategory,
    getAllBusinessList
}