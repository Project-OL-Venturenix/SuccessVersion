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
import {addEventUser} from "./api/eventuserApi";

export const UserList = () => {
    const loginUserStr = localStorage.getItem('user');
    const loginUser = loginUserStr ? JSON.parse(loginUserStr) : { accessToken: '' };

    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    function handleAddUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const eventId = prompt("Enter Event ID:") || ""; // prompt user for event ID
        const userId = prompt("Enter User ID:") || ""; // prompt user for event ID
        addEventUser(userId, loginUser.accessToken, eventId);
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
                    <Button label="Add User To Event" onClick={(event) => handleAddUser(event)} />
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
