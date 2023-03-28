import Link from "next/link";

export default function ErrorPage(props) {
    return (
        <div>
            ErrorPage {props.errorMessage}
        </div>
    );
}
