# Festifind

Festifind is a modern event management platform where admins can manage events and transactions, while users can browse upcoming events, book tickets, and view their booked tickets in their profile section.

## Tech Stack

- **Next.js 14.2.5**: A React framework for building server-side rendered and statically generated web applications.
- **MongoDB**: A NoSQL database used for storing user, event, and transaction data.
- **AWS S3**: Amazon's Simple Storage Service, used for file uploads such as event images.
- **Tailwind CSS**: A utility-first CSS framework for styling the user interface.
- **Stripe**: A payment processing platform used for handling ticket purchases.

## Features

### Admin Capabilities
- **Create Events**: Admins can create new events with details like event name, date, description, and images.
- **Update Events**: Admins can update existing event information.
- **Delete Events**: Admins have the ability to delete events.
- **View Transactions**: Admins can view all transaction records, including successful payments.

### User Capabilities
- **View Upcoming Events**: Users can browse and view details of upcoming events.
- **Book Tickets**: Users can purchase tickets for events using Stripe for payment processing.
- **View Booked Tickets**: Users can view their booked tickets in the profile section.

