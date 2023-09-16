import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Typography
} from '@mui/material';
import { useMoralis } from 'react-moralis';
import { useEffect,useState } from 'react';
import { NFTStorage } from 'nft.storage'
import styled from 'styled-components'

import {useDropzone} from 'react-dropzone'

const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE3YTEwQTE3MWIzNUUyYThkMTI2NTc0RjIzMDQ0N0U2NTJjMzBhYTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MTI0Nzg2MzkzMywibmFtZSI6IkJpemNsdWIifQ.r6KIrRNFH9P6iFyu5ZQraNWf0TFsw4979ENY_EYp_7c'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })


const Container2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #00e676;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

export const AccountProfile = () =>{
  var currentUser={}
  const [name,setName]=useState()
  var [avatar,setAvatar]=useState()
  var {Moralis}=useMoralis()

  const [loading,setLoading]=useState(false)
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone(  { accept: '.png, .jpg, .jpge'} );
async function fetchAvatar(){
  let name=""
  let description=""
  let image=""
  let user=await Moralis.User.current()

  if(user?.get("avatar")?.ipnft){
    console.log("ENTROOO")

    setLoading(true)

  await fetch("https://"+user?.get("avatar").ipnft+".ipfs.dweb.link/metadata.json")
          .then(function (response) {

            return response.json();
          }).then(function (data) {
            name = data.name

            description = data.description
            image = data.image
          })
          
 let newimage = image.replace("ipfs://", "https://")
 let final=newimage.replace( "/avatar.png",".ipfs.dweb.link/avatar.png")
 setAvatar(final)

 console.log("final "+final)
 setLoading(false)

 return
}

setLoading(false)


}

useEffect(()=>{
  
  fetchAvatar()
},[])
async function fetchImage(){
  let user=await Moralis.User.current()

  if(user){
    
  acceptedFiles.forEach(async (file) => {
    const reader = new FileReader()

  
    reader.onload = async () => {
      
  setLoading(true)
    // Do whatever you want with the file contents
      const binaryStr = reader.result
       let imageFile = await new File([ binaryStr ], 'avatar.png', { type: 'image' })

       if(imageFile){
    
        const metadata = await client.store({
          name: user.get("username"),
          description: "avatar",
          image: imageFile
        })
        user.set("avatar",metadata)
console.log("metadata "+metadata)
 await user.save()
            }
            fetchAvatar()

    }
    reader.readAsArrayBuffer(file)
  })
  

setName(user?.get("username"))

currentUser= {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: user?.get("username"),
  timezone: 'GTM-7'
};
}
}
  useEffect(()=>{
  if(acceptedFiles.length>0){
    
       fetchImage()
  }
  console.log("image ")

  },[acceptedFiles])
  
  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  return  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={avatar?avatar:"/assets/avatars/avatar-anika-visser.png"}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
    
      </Box>
    </CardContent>
    <Divider />
    {loading?<Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height:150,
          marginTop:10,
          flexDirection: 'column'
        }}
      ><CircularProgress/>
      </Box>:<Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height:150,
          flexDirection: 'column'
        }}
      >
    <CardActions> 
      <section className="container">
              <div className="container">
               <Container2 {...getRootProps()}>
               <input {...getInputProps()} />
               <p>Arrasta una foto o haz click para seleccionarla</p>
             </Container2>
     
    </div>
     
    </section>
    </CardActions>   </Box>}
  </Card>
};
