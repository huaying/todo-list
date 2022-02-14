import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <CssBaseline />
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}
