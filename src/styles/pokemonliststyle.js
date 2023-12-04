import { alpha, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
      paddingTop: "20px",
      paddingLeft: "50px",
      paddingRight: "50px",
    },
    cardMedia: {
      margin: "auto",
    },
    cardContent: {
      textAlign: "center",
    },
    searchContainer: {
      display: "flex",
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "5px",
      marginBottom: "5px",
      borderRadius: "20px"
    },
    searchIcon: {
      alignSelf: "flex-end",
      marginBottom: "5px",
    },
    searchInput: {
      width: "400px",
      margin: "5px",
      
    },
    bookmarkButtom: {
      marginLeft: "700px",
      marginBottom: "5px",
    },
    bookmarkIcon: {
      marginLeft: "390px",
      marginBottom: "5px",
    },
  }));

  export default useStyles;