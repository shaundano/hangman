import styles from "./css/Dictionary.module.css"

export interface DictionaryResponse {
    word: string;
    phonetic?: string;
    origin?: string;
    meanings: {
        partOfSpeech: string;
        definitions: {
            definition: string;
        }[];
    }[];
}

export interface DictionaryProps {
    reveal: boolean;
    data: DictionaryResponse | null;
}

export function Dictionary({ reveal, data }: DictionaryProps) {
    if (!reveal || !data) return null;

    return (
        <div className={styles.dictionaryContainer}>
            <h2 className={styles.wordTitle}>
                {data.word} 
                <span className={styles.phonetic}>{data.phonetic}</span>
            </h2>
            
            {data.origin && (
                <p className={styles.origin}>
                    <strong>Origin:</strong> {data.origin}
                </p>
            )}

            {data.meanings.map((m, i) => (
                <div key={i} className={styles.meaningGroup}>
                    <div className={styles.partOfSpeech}>{m.partOfSpeech}</div>
                    <ul className={styles.definitionList}>
                        {m.definitions.map((d, j) => (
                            <li key={j}>{d.definition}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}