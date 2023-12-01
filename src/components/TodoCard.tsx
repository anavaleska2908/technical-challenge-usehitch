// import { TodoSchema } from "~/lib/schemas/TodoSchema";
// import Paper from '@mui/material/Paper';
// import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from "@mui/material";
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// export default function TodoCard({id, title, completed, image }: TodoSchema) {

//   return (
//     <>
//       <Container component="main" maxWidth="xs" >
//         <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Paper elevation={2} variant="outlined" square={false}>
//             <Grid display="flex" justifyContent="center" sx={{marginTop: 1, marginLeft: 1}}>
//             {image ? <Avatar alt="Todo Image" src={image}  /> : <Avatar alt="Initial Names">AV</Avatar>}
//             <Box sx={{
//               marginRight: 1,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               paddingLeft: 2
//             }}>
//               <Stack component="form">
//                 <FormGroup itemID={id}>
//                   <TextField
//                         id="outlined-size-small"
//                         label="To-do Title"
//                         sx={{ marginTop: 1}}
//                         fullWidth
//                         defaultValue={title}
//                         size="small"
//                       />
//                   <Box sx={{
//                     marginRight: 1,
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "center",
//                     paddingLeft: 2
//                   }}>
//                     <FormControlLabel
//                     control={
//                       <Checkbox
//                         sx={{ '&:hover': { bgcolor: 'transparent' }}} color="success"
//                         size="small"
//                         defaultChecked={completed}
//                       />
//                     }
//                     label="Done"
//                   />
//                   <Button sx={{color: "text.primary"}}><DeleteOutlinedIcon /></Button>
//                   </Box>

//               </FormGroup>
//               </Stack>

//             </Box>
//           </Grid>
//           </Paper>
//         </Grid>
//       </Container>
//     </>
//   )
// }
