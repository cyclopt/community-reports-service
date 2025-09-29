import { Text, View } from "@react-pdf/renderer";
import React from "react";

import ContentHeader from "../ContentHeader.js";
import ProcessTable from "../ProcessTable.js";

const Process = () => (
	<View wrap={false} style={{ paddingLeft: "50px", paddingRight: "50px" }}>
		<ContentHeader title="3. PROCESS" />
		<View wrap={false} style={{ fontSize: "11px" }}>
			<Text>
				{"The following table depicts the prerequisites and the process for measuring the characteristics as defined by the Cyclopt methodology"}
			</Text>
			<ProcessTable maintainability security readability reuseability />
			<Text>
				{"The analysis is complete for the four aforementioned characteristics and is built upon the data acquired in a continuous manner using the Cyclopt platform throughout the software development process. For this report, the data provided include the source code of the application, along with the corresponding repositories (commit data)."}
			</Text>
		</View>
	</View>
);

export default Process;
