"use client";

import { useState, type FormEvent } from "react";
import { Button, Input, Modal, TextArea, useOverlayState } from "@heroui/react";
import { Itypes } from "@/type";
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

const toDateInputValue = (date: string) => {
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime()) ? date.slice(0, 10) : parsedDate.toISOString().slice(0, 10);
};

const EditDialog = ({ manageEventData }: { manageEventData: Itypes }) => {
    const router = useRouter()
    const state = useOverlayState();
    const [imageUrl, setImageUrl] = useState(manageEventData.image);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.currentTarget).entries());

        const updatedData = { ...formData };
        delete updatedData._id;


        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/allEvents/${manageEventData._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData)
        })
        // The API answers errors as HTML (Express500), so never assume the
        // body parses — the result isn't used anyway.
        await res.json().catch(() => null)
        router.refresh()

        state.close();

    };

    return (
        <Modal state={state}>
            <Modal.Trigger>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2"
                >
                    <span aria-hidden="true">✎</span>
                    Edit
                </button>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container size="lg" scroll="inside">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading className="text-xl font-black text-violet-950">Edit Event</Modal.Heading>
                            <p className="mt-1 text-sm text-slate-500">Update the details of your community event.</p>
                        </Modal.Header>
                        <form onSubmit={handleSubmit}>
                            <Modal.Body className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-slate-900" htmlFor={`event-title-${manageEventData._id}`}>
                                        Event Title
                                    </label>
                                    <Input
                                        id={`event-title-${manageEventData._id}`}
                                        name="title"
                                        defaultValue={manageEventData.title}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold text-slate-900" htmlFor={`event-type-${manageEventData._id}`}>
                                            Event Type
                                        </label>
                                        <select
                                            id={`event-type-${manageEventData._id}`}
                                            name="type"
                                            defaultValue={manageEventData.type}
                                            required
                                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        >
                                            {eventTypes.map((type) => <option key={type}>{type}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold text-slate-900" htmlFor={`event-date-${manageEventData._id}`}>
                                            Event Date
                                        </label>
                                        <Input
                                            id={`event-date-${manageEventData._id}`}
                                            name="date"
                                            type="date"
                                            defaultValue={toDateInputValue(manageEventData.date)}
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-slate-900" htmlFor={`event-location-${manageEventData._id}`}>
                                        Location / Venue
                                    </label>
                                    <Input
                                        id={`event-location-${manageEventData._id}`}
                                        name="location"
                                        defaultValue={manageEventData.location}
                                        required
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-slate-900" htmlFor={`event-image-${manageEventData._id}`}>
                                        Thumbnail Image URL
                                    </label>
                                    <Input
                                        id={`event-image-${manageEventData._id}`}
                                        name="image"
                                        type="url"
                                        value={imageUrl}
                                        onChange={(event) => setImageUrl(event.target.value)}
                                        required
                                        className="w-full"
                                    />
                                    <p className="mt-2 text-xs font-semibold text-slate-500">Quick photo presets:</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {photoPresets.map((preset) => (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => setImageUrl(preset.url)}
                                                className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-100"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-slate-900" htmlFor={`event-description-${manageEventData._id}`}>
                                        Event Description
                                    </label>
                                    <TextArea
                                        id={`event-description-${manageEventData._id}`}
                                        name="description"
                                        defaultValue={manageEventData.description}
                                        rows={4}
                                        required
                                        className="w-full"
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" variant="tertiary" onPress={state.close}>Cancel</Button>
                                <Button className="bg-violet-700" type="submit" variant="primary">Edit Event</Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditDialog;
