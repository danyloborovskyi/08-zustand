'use client';

type Props = {
  error: Error;
};

const NoteError = ({ error }: Props) => {
  return <p>Could not fetch note {error.message}</p>;
};

export default NoteError;
