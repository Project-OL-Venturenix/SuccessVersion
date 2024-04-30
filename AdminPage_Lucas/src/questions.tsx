import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    List,
    SimpleForm,
    TextField,
    TextInput
} from "react-admin";

export const QuestionList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="question" />
            <TextField source="testAnswer" />
            <TextField source="methodSignatures" />
            <TextField source="targetCompleteTime" />
            <EditButton />
        </Datagrid>
    </List>
);

export const QuestionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="question" multiline rows={5} style={{ width: "80%" }} />
            <TextInput source="testAnswer" multiline rows={5} style={{ width: "80%" }} placeholder="public static int testComputeCase(Question1 question, int[][] incomeBrackets, int income, double expectedTax) {
			double actualTax = question.computeTax(incomeBrackets, income);  
			   if (Math.abs(actualTax - expectedTax) < 0.00001) {return 1;} else {return 0;  
				    } }"/>
            <TextInput source="methodSignatures" multiline rows={5} style={{ width: "80%" }} placeholder="e.g : public int answer(String s) , no need to add { }" />
        </SimpleForm>
    </Edit>
);

export const QuestionCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="question" multiline rows={5} style={{ width: "80%" }} />
            <TextInput source="testAnswer" multiline rows={5} style={{ width: "80%" }} placeholder="public static int testComputeCase(Question1 question, int[][] incomeBrackets, int income, double expectedTax) {
			double actualTax = question.computeTax(incomeBrackets, income);  
			   if (Math.abs(actualTax - expectedTax) < 0.00001) {return 1;} else {return 0;  
				    } }"/>
            <TextInput source="methodSignatures" multiline rows={5} style={{ width: "80%" }} placeholder="e.g : public int answer(String s) , no need to add { }" />
            <TextInput source="targetCompleteTime" multiline rows={5} style={{ width: "80%" }} placeholder="please input ms : 1000 or above" />

        </SimpleForm>
    </Create>
);
