"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { Button, Label, TextArea } from "@heroui/react";
import { useSession } from "../lib/auth-client";
import { useRouter } from "next/navigation";

const eventTypes = [
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "Food Drive",
    "Health Camp",
    "Free Education",
];

const photoPresets = [
    { label: "Winter Clothes", url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80" },
    { label: "Blanket Relief", url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80" },
    { label: "Cleanup", url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80" },
    { label: "Tree Plantation", url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80" },
];

const today = new Date().toISOString().split("T")[0];

function FieldIcon({ children }: { children: ReactNode }) {
    return (
        <span aria-hidden="true" className="text-slate-400">
            {children}
        </span>
    );
}

const CreateEventForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const { data: session } = useSession()
    const router = useRouter()
    const user = session?.user

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        const formData = Object.fromEntries(new FormData(event.currentTarget).entries());
        setSubmitted(true);

        const userData = {
            ...formData,
            userName: user?.name,
            userEmail: user?.email,
            userImage: user?.image,
            eventCreationDate: new Date()
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/form-datas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })

            if (!res.ok) {
                throw new Error(`The event could not be published (${res.status}).`);
            }

            router.push("/manageEvents");
            router.refresh();
        } catch (publishError) {
            setSubmitted(false);
            setErrorMessage(
                publishError instanceof Error
                    ? publishError.message
                    : "The event could not be published.",
            );
        }
    };

    return (
        <main className="min-h-screen bg-base-100 px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto bg-base-100 max-w-157.5 rounded-xl border border-slate-200  px-5 py-7 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:px-9 sm:py-8">
                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600">
                        <span aria-hidden="true">✣</span>
                        Social Service Drive
                    </span>
                    <h1 className="mt-3 text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[28px]">
                        Create a Community Event
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Organize a local relief effort, environmental cleanup, or community support drive.
                    </p>
                </div>

                <form className="space-y-5 bg-base-100" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="event-title" className="event-form-label">
                            Event Title <span className="required-mark">*</span>
                        </Label>
                        <div className="event-input-shell bg-base-100">
                            <FieldIcon>T</FieldIcon>
                            <input
                                id="event-title"
                                name="title"
                                required
                                pattern="^[^0-9]*$"
                                title="Numbers are not allowed in the event title"
                                placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                                className="event-form-input"
                            />
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="event-type" className="event-form-label">
                                Event Type <span className="required-mark">*</span>
                            </Label>
                            <div className="event-input-shell bg-base-100">
                                <FieldIcon>◇</FieldIcon>
                                <select id="event-type" name="type" required className="event-form-input appearance-none bg-base-100">
                                    {eventTypes.map((type) => (
                                        <option key={type}>{type}</option>
                                    ))}
                                </select>
                                <span aria-hidden="true" className="text-xs text-slate-400">⌄</span>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="event-date" className="event-form-label">
                                Event Date <span className="required-mark">*</span>
                            </Label>
                            <div className="event-input-shell bg-base-100">
                                <FieldIcon>▣</FieldIcon>
                                <input id="event-date" name="date" type="date" min={today} required className="event-form-input" />
                            </div>
                            <p className="mt-2 text-[11px] text-slate-500">Dates must be in the future (today or later)</p>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="event-location" className="event-form-label">
                            Location / Venue <span className="required-mark">*</span>
                        </Label>
                        <div className="event-input-shell bg-base-100">
                            <FieldIcon>⌖</FieldIcon>
                            <input
                                id="event-location"
                                name="location"
                                required
                                pattern="^[^0-9]*$"
                                title="Numbers are not allowed in the event title"
                                placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                                className="event-form-input"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="event-image" className="event-form-label">
                            Thumbnail Image URL <span className="required-mark">*</span>
                        </Label>
                        <div className="event-input-shell bg-base-100">
                            <FieldIcon>▧</FieldIcon>
                            <input
                                id="event-image"
                                name="image"
                                type="url"
                                required
                                value={imageUrl}
                                onChange={(event) => setImageUrl(event.target.value)}
                                placeholder="https://images.unsplash.com/photo-..."
                                className="event-form-input"
                            />
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
                            <span>Quick photo presets:</span>
                            {photoPresets.map((preset, index) => (
                                <span key={preset.label} className="inline-flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setImageUrl(preset.url)}
                                        className="font-medium text-teal-600 transition hover:text-teal-800 hover:underline"
                                    >
                                        {preset.label}
                                    </button>
                                    {index < photoPresets.length - 1 && <span aria-hidden="true">•</span>}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="event-description" className="event-form-label">
                            Event Description <span className="required-mark">*</span>
                        </Label>
                        <TextArea
                            id="event-description"
                            name="description"
                            required
                            rows={4}
                            placeholder="Explain the purpose of the drive, volunteers required, items being distributed, or tasks to complete..."
                            className="event-form-input min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-base-100 px-3.5 py-3.5 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-base-100 px-3.5 py-3.5 text-xs text-slate-500">
                        <span>Organizer Email attached:</span>
                        <strong className="text-[11px] text-slate-700">{user?.name}</strong>
                    </div>

                    <Button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 py-3.5 text-sm font-bold text-white shadow-sm shadow-violet-200 transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                    >
                        <span aria-hidden="true">⊕</span>
                        Publish Event
                    </Button>
                    {submitted && !errorMessage && (
                        <p role="status" className="text-center text-sm font-medium text-teal-700">
                            Publishing your event…
                        </p>
                    )}
                    {errorMessage && (
                        <p role="alert" className="text-center text-sm font-semibold text-red-600">
                            {errorMessage}
                        </p>
                    )}
                </form>
            </div>
        </main>
    );
};

export default CreateEventForm;