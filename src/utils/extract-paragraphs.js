// Function used to split paragraphs returned from LLM
// We handle each paragraph seperately to:
// i) enhance readability
// ii) avoid overlaps between sections (especially in nis2 practices section)
const extractParagraphs = (text) => text
	.split(/\n{2,}/) // Split on two or more newlines
	.map((p) => p.trim()) // Trim whitespace around each paragraph
	.filter((p) => p.length > 0); // Remove empty ones

export default extractParagraphs;
