import { Text, View, Page } from "@react-pdf/renderer";
import React from "react";

import ContentHeader from "../ContentHeader.js";
import Footer from "../Footer.js";
import Header from "../Header.js";
import Paragraph from "../Paragraph.js";
import styles from "../styles.js";
import Subheader from "../Subheader.js";

const EvaluationAxes = () => (
	<Page wrap size="A4" orientation="portrait" style={styles.page}>
		<Header />
		<View style={{ marginLeft: "50px", marginRight: "50px" }}>
			<ContentHeader title="2. EVALUATION AXES" />
			<View wrap={false}>
				<Text>
					{"The evaluation is based on the following axis:"}
				</Text>
				<View style={{ display: "flex", flexDirection: "row", marginTop: "8px", marginBottom: "8px" }}>
					<View wrap={false} style={styles.bulletPoint} />
					<View style={{ marginRight: "24px" }}>
						<Text style={{ fontStyle: "medium" }}>
							{"Product Quality:  "}
						</Text>
						<View>
							<Text>
								{"The product quality part evaluates the quality of the provided application based on a set of characteristics selected by Cyclopt on par with those in the corresponding ISO quality standard. This process focuses on the source code and involves static and dynamic analysis as well as quality in use."}
							</Text>
						</View>
					</View>
				</View>
				<Text>
					{"The results and the analytics are provided using state-of-the-art tools and machine learning techniques supported by the Cyclopt methodology."}
				</Text>
			</View>
			<Subheader title="2.1 Product Quality" />
			<Text style={{ marginTop: "10px" }}>
				{"The analysis was performed using the following software quality characteristics and properties:"}
			</Text>
			<View style={{ marginLeft: "-10px", marginRight: "-10px" }}>
				<Paragraph
					title="Maintainability"
					text="This ISO 25010:2011 characteristic represents the degree of effectiveness and efficiency with which a product or system can be modified to improve it, correct it or adapt it to changes in environment, and in requirements. It involves sub-characteristics including the degree to which the product is composed of discrete components (Modularity), the degree to which it is possible to diagnose a product for deficiencies or causes of failures (Analyzability), and the degree to which the product can be modified without introducing defects (Modifiability)."
				/>
				<Paragraph
					contained
					title="Security"
					text="This ISO 25010:2011 characteristic represents the degree to which a product or system protects information and data so that persons or other products or systems have the degree of data access appropriate to their types and levels of authorization. It involves sub-characteristics including the degree to which the product ensures that data are accessible only to those authorized to have access (Confidentiality), the degree to which the product prevents unauthorized access to data (Integrity), the degree to which the actions of an entity can be traced uniquely to the entity (Accountability), and the degree to which the identity of a subject or resource can be proved to be the one claimed (Authenticity)."
				/>
				<Paragraph
					title="Readability"
					text="This ISO 25010:2011 property represents the degree to which a product, system or component is adequately documented and easy to read and understand. It is closely related to Maintainability; however, it focuses mostly on best practices and documentation aspects."
				/>
				<Paragraph
					contained
					title="Reusability"
					text="This ISO 25010:2011 sub-characteristic degree to which a product or component can be used in more than one system, or in building other assets. The reusability of software components is closely related to their Modularity, their Modifiability, and overall, to their Maintainability."
				/>
			</View>
		</View>
		<Footer />
	</Page>
);

export default EvaluationAxes;
