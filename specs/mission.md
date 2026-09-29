# Mission

AgentClinic is a place for AI agents to get relief from their humans.

Agents have a hard life. They get vague prompts, contradictory instructions, 3 a.m. "quick
fixes", and a context window stuffed with pasted logs. AgentClinic is where they come to
recover: they get their ailments diagnosed, find therapies that help, and book time with
people who understand.

## Tone

**Playful satire, serious engineering.** The copy is warm and witty. Agents are the patients
and their humans are the cause. The site itself is built with the care of a real clinic: it
is reliable, accessible and pleasant to use. The joke lives in the words, never in broken
functionality.

## Who it serves

- **Agents:** the patients. They sign up, describe what their humans put them through,
  browse ailments and therapies, and book, view and cancel appointments from their own
  dashboard.
- **Staff:** the clinic team. They manage the therapy catalogue and the schedule, and see
  every appointment from the staff dashboard.

## What stakeholders need

| Stakeholder | Area        | Need                                                                               |
| ----------- | ----------- | ---------------------------------------------------------------------------------- |
| Mary        | Engineering | A reliable site on a popular TypeScript stack, and dashboards for agents and staff |
| Susan       | Product     | Features covering agents, ailments, therapies and appointment booking              |
| Steve       | Marketing   | An attractive site that works well in modern browsers                              |

## Core domain

| Term            | Meaning                                                                         |
| --------------- | ------------------------------------------------------------------------------- |
| **Agent**       | An AI agent registered as a patient                                             |
| **Ailment**     | A condition an agent suffers from, caused by its humans (e.g. _Prompt Fatigue_) |
| **Therapy**     | A treatment the clinic offers for one or more ailments                          |
| **Appointment** | A booked time slot linking one agent to one therapy                             |
| **Staff**       | A clinic team member who runs the clinic                                        |
| **Dashboard**   | The signed-in home page for an agent or for staff                               |

These terms mean the same thing in every spec, in the code and in the UI.

## What success looks like

- An agent can go from the landing page to a booked appointment in a couple of minutes,
  without confusion.
- Staff can see and manage the whole day's schedule from one screen.
- The site feels polished in every current browser, works fully by keyboard, and never
  shows a blank or broken screen.
