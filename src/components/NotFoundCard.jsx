import React from "react";

import styled, { css } from "styled-components";

const NotWrapper = styled.div`
    position: relative;
    height: 480px;
    border-radius: 2.5rem;
    background: white;
    border: 2px solid rgb(226 232 240 / 1);
    display: flex;
    align-items: center;
    justify-content: center;

    .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p {
        margin: 25px 0 0 0;
        font-weight: 700;
        font-size: 1.25rem;
        letter-spacing: -0.025em;
        color: rgb(30 41 59 / 1);
        line-height: 1.75rem;
    }
    span {
        margin-top: 10px;
        color: rgb(148 163 184 / 1);
        font-weight: 600;
        font-size: 0.75rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        background-color: rgb(241 245 249 / 1);
        border-radius: 50px;
        line-height: 1rem;
    }
`;

const NotBtn = styled.button`
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    z-index: 10;
    background: rgb(255 255 255 /1);
    color: #ef4444;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(254 226 226 / 1);
    cursor: pointer;
    transition: all 0.35s;

    &:hover {
        transform: rotate(90deg);
        background: #ef4444;
        color: #fff;
    }
`;

const NotFoundIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: rgb(254 242 242 / 1);
    box-shadow:
        0 0 0 0px #fff,
        0 0 0 8px rgb(254 242 242 / 0.5),
        0 0 #0000;

    svg {
        width: 2.5rem;
        height: 2.5rem;
        color: rgb(248 113 113 / 1);
    }
`;

const NotFoundCard = ({ query, not, onDelete }) => {
    return (
        <NotWrapper>
            <NotBtn
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(not.id);
                }}
            >
                <svg style={{ width: "2.5rem", height: "2.5rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </NotBtn>

            <div className="inner">
                <NotFoundIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </NotFoundIcon>

                <p>Location Not Found</p>
                <span>" {query} "</span>
            </div>
        </NotWrapper>
    );
};

export default NotFoundCard;
