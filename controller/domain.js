exports.checkDomain = async (req, res) => {
    const { nama_domain } = req.query;
    console.log(nama_domain);
    res.status(200).json({ message: 'success' });
};
