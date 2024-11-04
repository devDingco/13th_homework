"use client";
import { Alert } from "antd";
import BoardsListPage from "./boards/page";

export default function Home() {
    return (
        <>
            <Alert message="Success Text" type="success" />
            <br />
            <Alert message="Info Text" type="info" />
            <br />
            <Alert message="Warning Text" type="warning" />
            <br />
            <Alert message="Error Text" type="error" />
            <br />
            <BoardsListPage />
        </>
    );
}
