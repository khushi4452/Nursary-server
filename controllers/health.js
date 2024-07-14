const gethealth = (req, res) => {
    res.json({
        success: true,
        message: "Server is running..."
    });
};

export { gethealth };
