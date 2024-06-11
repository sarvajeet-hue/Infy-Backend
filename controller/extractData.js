const ExistingModel = require('../models/existingModel');

const extractData = async (req, res) => {
    try {
        const { paragraph } = req.body;
        if (!paragraph) {
            return res.status(400).json({
                message: "Paragraph is required"
            });
        }

        // Convert the paragraph to lowercase and split into words
        const keywordsArray = paragraph.toLowerCase().split(/\s+/);
        const keywordsSet = new Set(keywordsArray); // Convert array to set for faster lookup
        console.log("keywordsSet:", keywordsSet)
        let maxMatchCount = 0;
        let matchedDocument = null;

        // Query all documents from the collection
        const allDocuments = await ExistingModel.find({});

        // Iterate through each document to find the one with the highest number of matched keywords
        allDocuments.forEach(doc => {
            if (Array.isArray(doc.Keywords)) {
                const matchedKeywords = doc.Keywords.filter(keyword => keywordsSet.has(keyword.toLowerCase()));
                const matchCount = matchedKeywords.length;
                console.log("matchCount:", matchCount)
                if (matchCount > maxMatchCount) {
                    maxMatchCount = matchCount;
                    matchedDocument = doc;
                }
            }
        });

        // Check if any matching document was found
        if (!matchedDocument) {
            return res.status(404).json({
                message: "No data found"
            });
        }

        return res.status(200).json({
            message: "Data extracted successfully",
            data: matchedDocument
        });
    } catch (error) {
        console.error("Error while extracting data:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { extractData };
