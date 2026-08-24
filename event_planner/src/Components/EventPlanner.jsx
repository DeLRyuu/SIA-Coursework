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
        {/* Event categories content goes here */}
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