# Innovaccer SummerGeeks SDE Assignment

Innovaccer SummerGeeks submission by Deepesh Khubchandani.

### Problem Statement

https://summergeeks.in/static/assignments/summergeeks%202020%20-%20SDE%20Assignment.pdf

# Entry Management System

The main motive of this venture was to create a software that can help a visitor check into an office without any kind of human intervention. The assignment aims at automating check in's and check out's at a workplace. As soon as the application is opened, the home page will appear. There can be multiple hosts at a workplace, the host can register by filling their details. The visitor needs to Check-IN by entering certain details such as name, email, contact number and email of the host that they wish to meet. This will push an email and an SMS to the host, informing him about the details of the visitor. At the time of leaving the visitor needs to Check-OUT by entering email and contact number. This will push an email to the visitor about his Check-IN and Check-OUT time.

### Technology Stack

-   NodeJS
-   MongoDB
-   ExpressJS
-   Twilio messaging API
-   NodeMailer email API
-   EJS (npm package)
-   HTML 5
-   CSS 3
-   JavaScript
  
  ## Implementation
  
  The application can be primarily used for the following three tasks:

-   Registration of a new host
-   Recording Visitor Check In
-   Visitor Check Out


### Home Page
As the application will open, Home page will be shown as below. 

![homepage](https://user-images.githubusercontent.com/33034833/69918426-ca9b1600-1497-11ea-9e68-004b7b945ed7.PNG)

### Host Registration
A workplace can have more than one host. All the hosts would register as shown below. When the visitor will try to Check-IN, he/she needs to choose the host that they need to meet. All the fields are mandatory. If the deatils are valid, host will be generated otherwise it will shown an error. For example, if the '@' is not present in the email then it will display an error for it.

![hostpage](https://user-images.githubusercontent.com/33034833/69918429-cf5fca00-1497-11ea-86ef-1aa8e93ebfd1.PNG)

### Visitor Check In
As the visitor opens the application, home page appears as shown below. The visitor can then go to the Check-IN option for his entry and can do so by filling the details in the form. All the details are mandatory and if all the details are valid, the form is submitted and the host is informed about the check in through SMS and email. Here also the errors will be displayed accordingly. Moreover, if there is anything wrong in the email of the host then it will show an error "Host not found".

![checkinpage](https://user-images.githubusercontent.com/33034833/69918431-d4bd1480-1497-11ea-8934-8a85ad8196df.PNG)

### Visitor Check Out

A seperate check out page has been created where the user is required to mention the same mobile number they entered during check in. If all details are valid, the user will be checked out and will be sent all details through email otherwise he will be asked to fill the details again.

![checkoutpage](https://user-images.githubusercontent.com/33034833/69918434-dab2f580-1497-11ea-8250-d0c77aa9feca.PNG)


### Instructions to install

1. Clone this repository:

`git clone 

2. Change directory

`cd 

3. Install dependencies

`npm install`

4. Generate and Authentication Key, Sender ID and Phone Number for messaging api.

Refer to this link -  https://www.twilio.com/

5. Open Config.js file int the folder Conifg and add below mentioned details in it.
```
# specify your Twilio Authentication Key  here
SMS_AUTH_KEY = Twilio Authentication Key

# specify your Twilio Sender ID  here
SMS_ACCOUNT_SID = Twilio Sender ID

# specify your Twilio Phone Number  here
SMS_NUMBER = Twilio Phone Number

# specify credentials for nodemailer(email api) here, please enable less secure apps on gmail.

EMAIL = Emain Address (STRING)
PASSWORD = Password of the email used (STRING)

```
6. Start the server
`npm start`

Please refer to the link below, to know how the application works.

https://www.youtube.com/watch?v=13n0_iWtRsA

# Credits

Created by: Deepesh Khubchandani

Email: deepeshkhubchandani0145@gmail.com

or

Email: 17uec042@lnmiit.ac.in

Contact: +919414490556
