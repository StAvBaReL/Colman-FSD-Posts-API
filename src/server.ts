import initApp from "./index";

const PORT = process.env.PORT || 3000;

initApp()
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
