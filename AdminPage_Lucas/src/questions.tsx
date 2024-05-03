import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    List,
    SimpleForm,
    TextField,
    TextInput,
    Button
} from "react-admin";
import React from 'react';
import BASE_URL from './BaseUrl';

const getQuestionID = () => {
    const question = localStorage.getItem('question');
    return question ? JSON.parse(question).id : null;
};

export const QuestionList = () => {

    function handleAddQuestion(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, questionId: string): void {
        const eventId = prompt("Enter Event ID:") || ""; // prompt user for event ID
        const apiUrl = `${BASE_URL}/api/addEventQuestion/event/${eventId}/question/${questionId}`;

        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: questionId,
                eventId: eventId,
            }),
        })
            .then(response => {
                // handle response
                console.log(response);
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    return (
        <List>
            <Datagrid>
                <TextField source="id" />
                <TextField source="question" />
                <TextField source="testAnswer" />
                <TextField source="methodSignatures" />
                <TextField source="targetCompleteTime" />
                <EditButton />
                <Button label="Add Question To Event" onClick={(event) => handleAddQuestion(event, getQuestionID())} />

            </Datagrid>
        </List>
    );
};

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
