import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SocialIcon } from "react-social-icons";
import Header from "../components/Header";

export default function Album() {
  return (
    <div style={{ height: "200%" }}>
      <Header />
      <main>
        <Container sx={{ height: "100%" }}>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              sx={{ padding: 5, display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  height: 1000,
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="h4" component="h1">
                  Technologies
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <i
                      style={{ fontSize: 100 }}
                      class="devicon-tensorflow-line-wordmark colored"
                    ></i>
                  </Grid>
                  <Grid item xs={6}>
                    <i
                      style={{ fontSize: 100 }}
                      class="devicon-python-plain-wordmark colored"
                    ></i>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                ></Box>
                Judge the Judge is based on a machine learning model that
                classifies pitch data into different categories. The model was
                predominantly built using TensorFlow and Keras, two popular
                frameworks for building deep learning models, which can learn to
                recognize patterns in data and make predictions about new
                examples. Using categorical classification, the models goal is
                to aid in assigning each input to one of several possible output
                categories (in this case, 13 different events like a strikeout,
                walk, or home run).
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                  }}
                >
                  <Typography variant="h6" component="h2" gutterBottom>
                    10,000+ Pitches
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    70% Accuracy
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    13 Unique Categories
                  </Typography>
                </Box>
                <figure>
                  <img
                    src="/loss_1.png"
                    style={{ width: 300 }}
                    alt="a graph of loss vs accuracy of model"
                  />
                  <figcaption
                    style={{
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    Final Loss vs Accuracy of Model (73% Accurate)
                  </figcaption>
                </figure>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "#ff000080",
                padding: 5,
              }}
            >
              <Typography variant="h4" component="h1">
                Performance
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <br />
                <br />
                Two important metrics to pay attention to are accuracy and loss.
                Accuracy measures how often the model predicts the correct
                category for a given input, while loss measures how far off the
                model's predictions are from the true values. Ideally, you want
                a model with high accuracy and low loss. During the development
                of this project, I tracked the models performance with charts.
                Tuning the model with different weights and trying different
                iterations (or epochs) were a valuable tool to get the model to
                reliably report accurate data.
                <br />
                <br />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <figure>
                  <img
                    src="/loss_2.png"
                    style={{ width: 300 }}
                    alt="a graph of loss vs accuracy of model"
                  />
                  <figcaption
                    style={{
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    The first attempts had lower accuracy and higher loss
                  </figcaption>
                </figure>
              </div>
              <br />
              <br />
              However, it's important to keep in mind that these metrics can be
              influenced by factors like the quality of the training data and
              the complexity of the model. It's also important to choose the
              right evaluation metric for your specific use case, as different
              metrics may be more or less appropriate depending on the goal of
              the model.
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              sx={{
                padding: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Next Steps
              </Typography>
              There is always room for improvement! One approach I hope to aim
              for is to gather more data, particularly data from different
              sources or contexts like creating synthetic data. This can help
              the model learn to recognize more subtle patterns in the data and
              make more accurate predictions.
              <br />
              <br />
              Another strategy is to experiment with different feature
              representations, such as using different subsets of the available
              features or transforming the data in different ways. Finally, I
              may want to consider using more advanced modeling techniques, such
              as deep learning or ensemble methods, which can help to capture
              more complex relationships between the input and output variables.
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "courier",
                  }}
                  color="text.secondary"
                  align="center"
                >
                  Questions? Comments? Suggestions?{" "}
                </Typography>
                <Typography>
                  Feel free to view the source code on GitHub or reach out to me
                  on LinkedIn!
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <SocialIcon url="https://www.linkedin.com/in/michael-grandori/" />
                  <SocialIcon url="https://medium.com/@grandorimichael" />
                  <SocialIcon url="https://github.com/manthonyg" />
                </Box>
              </>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
