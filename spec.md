# BestGo Logistics Private Limited

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Multi-page logistics website: Home, About, Services, Fleet, Booking/Quote, Tracking, Contact
- Booking/quote form with: name, phone, pickup location, delivery location, type of goods, weight/load size, preferred date
- Shipment tracking page by tracking ID
- Contact form
- Admin panel: manage bookings, update shipment tracking status
- Customer login dashboard: view own bookings and tracking status
- Navigation bar with BestGo Logistics logo
- Footer with social media links
- WhatsApp floating contact button
- Role-based access: admin and customer roles

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend
- Booking record: id, trackingId, customerName, phone, pickupLocation, deliveryLocation, goodsType, weight, preferredDate, status (pending/confirmed/in-transit/delivered), submittedAt, userId (optional)
- Shipment tracking query by tracking ID (public)
- Submit booking (public + authenticated)
- Admin: list all bookings, update booking status
- Customer: list own bookings
- Contact form submission: name, email, phone, message
- Role-based: admin and customer

### Frontend
- Home page: hero with trucks on highway, headline, company intro, CTAs
- About page: history, mission/vision, why choose us
- Services page: FTL, Part Load, Long Distance, Industrial Goods, Warehouse Support
- Fleet page: truck types with specs (container, trailer, mini)
- Booking/Quote page: full form, submit to backend
- Tracking page: input tracking ID, show status
- Contact page: contact info, map embed, contact form
- Login/Register: customer and admin auth
- Customer dashboard: view own bookings
- Admin dashboard: view all bookings, update status
- Colors: dark blue (#1a2e5a), orange (#f97316), white
- WhatsApp floating button
