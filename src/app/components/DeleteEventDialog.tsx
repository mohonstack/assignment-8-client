"use client";

import { useState } from "react";
import { Button, Modal, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Itypes } from "@/type";

const DeleteEventDialog = ({ manageEventData }: { manageEventData: Itypes }) => {
    const router = useRouter();
    const state = useOverlayState();
    const [error, setError] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setError("");
        setIsDeleting(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/allEvents/${manageEventData._id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("The event could not be deleted.");
            }

            state.close();
            router.refresh();
        } catch (deleteError) {
            setError(deleteError instanceof Error ? deleteError.message : "The event could not be deleted.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal state={state}>
            <Modal.Trigger>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                >
                    <span aria-hidden="true">♲</span>
                    Delete
                </button>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container size="sm">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading className="text-xl font-black text-rose-700">
                                Delete this event?
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-sm leading-6 text-slate-600">
                                You are about to permanently delete{" "}
                                <strong className="font-bold text-slate-900">{manageEventData.title}</strong>.
                                This action cannot be undone.
                            </p>
                            {error && (
                                <p role="alert" className="mt-4 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">
                                    {error}
                                </p>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="tertiary" onPress={state.close} isDisabled={isDeleting}>
                                Cancel
                            </Button>
                            <Button type="button" variant="danger" onPress={handleDelete} isDisabled={isDeleting}>
                                {isDeleting ? "Deleting..." : "Delete Event"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteEventDialog;
