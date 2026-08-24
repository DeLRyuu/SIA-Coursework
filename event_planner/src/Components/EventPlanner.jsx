import './EventPlanner.css';
function EventPlanner() {
  return (
    <div className="event-planner-container">
      {/* Page Header */}
      <header>
        <h1>Welcome to Event Planner</h1>
      </header>

      {/* Section for describing the purpose or overview of the app */}
      <section className="description">
        {/* Brief introduction or marketing message */}
        <p>
            Plan and organize your events effortlessly with Event Planner. From
            birthdays to corporate meetings, we've got you covered.
        </p>
        {/* Primary call-to-action button */}
        <button className="get-started-button">Get Started</button>
      </section>

      {/* Section to list or categorize different types of events */}
      <section className="events_categories">
        {/* Social event types */}
        <ul>
            <h2>Social Events:</h2>
            <li>Birthday parties</li>
            <li>Anniversary celebrations</li>
            <li>Wedding receptions</li>
            <li>Baby showers</li>
            <li>Graduation parties</li>
            <li>Family reunions</li>
        </ul>

        {/* Entertainment-based event types */}
        <ul>
            <h2>Entertainment Events:</h2>
            <li>Concerts</li>
            <li>Music festivals</li>
            <li>Film screenings</li>
            <li>Comedy shows</li>
            <li>Art exhibitions</li>
            <li>Cultural events</li>
        </ul>

        {/* Community-focused event types */}
        <ul>
            <h2>Community Events:</h2>
            <li>Fundraising events</li>
            <li>Charity galas</li>
            <li>Volunteer drives</li>
            <li>Neighborhood block parties</li>
            <li>Community festivals</li>
            <li>Cultural celebrations</li>
        </ul>
        </section>

      {/* Section to highlight app features or functionalities */}
      <section className="features">
        {/* Features content goes here */}
      </section>

      {/* Section to showcase user reviews or testimonials */}
      <section className="testimonials">
        {/* Testimonials content goes here */}
      </section>

      {/* Section to provide contact information or a contact form */}
      <section className="contact">
        {/* Contact content goes here */}
      </section>
    </div>
  );
}

export default EventPlanner;