import { Theme, useMediaQuery } from "@mui/material";
import {
    Button,
    Create,
    Datagrid,
    Edit,
    EditButton,
    EmailField,
    List,
    ReferenceInput,
    SimpleForm,
    SimpleList,
    TextField,
    TextInput
} from "react-admin";
import React from 'react';

import BASE_URL from './BaseUrl';

export const UserList = () => {

    const getUserID = () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).id : null;
    };

    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    // Corrected the type of 'event' from 'MouseEvent<HTMLButtonElement, MouseEvent>' to 'MouseEvent'
    function handleAddUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, userId: string): void {
        const eventId = prompt("Enter Event ID:") || ""; // prompt user for event ID
        const apiUrl = `${BASE_URL}/api/join?userId=${userId}&eventId=${eventId}`;
        //  {{apiUrl}}/api/join?userId=12&eventId=6
        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
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
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="userName" />
                    <TextField source="firstName" />
                    <TextField source="lastName" />
                    <EmailField source="mobile" />
                    <TextField source="email" />
                    <TextField source="company" />
                    <TextField source="title" />
                    <TextField source="status" />
                    <TextField source="createddate" />
                    <TextField source="title" />
                    <EditButton />
                    <Button label="Add User To Event" onClick={(event) => handleAddUser(event, getUserID())} />
                </Datagrid>
            )}
        </List>
    );
};

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <ReferenceInput source="userId" reference="users" link="show" />
            <TextInput source="id" />
            <TextInput source="firstName" style={{ width: "50%" }} />
            <TextInput source="lastName" style={{ width: "50%" }} />
            <TextInput source="mobile" style={{ width: "50%" }} />
            <TextInput source="email" style={{ width: "50%" }} />
            <TextInput source="username" style={{ width: "50%" }} />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="firstname" required />
            <TextInput source="lastname" required />
            <TextInput source="status" required />
            <TextInput source="mobile" required />
            <TextInput source="email" required />
            <TextInput source="username" required />
            <TextInput source="company" required />
            <TextInput source="password" required />
            <TextInput source="title" required />
        </SimpleForm>
    </Create>
);
