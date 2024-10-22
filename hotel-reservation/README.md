This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


# TripTalk 여행후기(TripTalk) 공유, 호텔 숙박권 구매 및 판매, 마이페이지를 통한 포인트 충전 관리 등이 가능한 플랫폼
#### TripTalk is a mock platform where you can share your travelogs(TripTalk), buy & sell hotel reservations, and manage your cash equivalent points in your profile page.


### Features
- 3 Major pages: TripTalk main page, Reservation Buy & Sell main page, My Profile Page
- Main features:
-- CRUD of TripTalk posts. A searchable and paginated list view of them and detailed view for each.
-- AUTH - Login and Signup. Necessary for Reservation transaction, and My Profile
-- CRUD of Reservation product, and also CRUD of product purchases. There are 2 types of users (Buyers and Sellers)
-- CRUD of My Profile info. Along with personal contact info, there is a Point system with which users can buy & sell reservations.
-- Responsive Design

### Architecture
- React & Next.js & Redux & Apollo GraphQL Client for frontend
- Communicates with Backend via GraphQL (JSON payload)

### Principles
Locality of Behavior > DRY, SOLID
Complex State should be managed in a single giant function rather than 10 different places. Sacrifice reusability for maintainability.
I chose this principle particularly due to the difficulties of debugging asynchronous and stateful programs

### Testing Frameworks
- Jest(Unit), Cypress(E2E)


### File based Routes
/ => /boards BoardMainView


### Goal
- Oct 22
-- BoardPostForm Page: 1. Input Validation 2. Postal Code API 3. YouTube Link Input 4. OnSubmit: Error Handling Modal / Redirect
-- BoardEditForm Page: 1. Shared Component with BoardPostForm 2. Disabled Fields 3. OnSubmit: Error Handling Modal / Redirect & Refetch
-- BoardPluralView Page: 1. Paginated view 2. Searchable view 3. Deletion Button & Confirmation Modal & Error Handling Modal 4. Refetch
-- BoardSingleView Page: 1. Like/Dislike button 2. Basic Content Render


- State Diagram (Oct 22)
-- B.P.F Page
   onChange -> SubmitReady | NotSubmitReady -> (S.R): onSubmit -> SubmitSuccess | SubmitFail -> (S.S) -> Redirect: B.P.V Page
                                            |                                               |
                        (N.S.R):onChange <--|                                               |--> (S.F) -> ClientError | ServerError
                                                                                                             |
                                                                                                             |
                                                                                    onInput <--(C.E)---onCloseModal---(S.E)-->onSubmit (auto-retry/debounce)
-- B.E.F Page
   
