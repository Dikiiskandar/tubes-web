<?php

namespace App\Services;

use Google\Cloud\Firestore\FirestoreClient;

class FirestoreService
{
    protected $firestore;

    public function __construct()
    {
        $this->firestore = new FirestoreClient([
            'keyFilePath' => storage_path('firebase/firebase_credentials.json'),
            'projectId' => 'fooddeleveryaza',
        ]);
    }

    public function getCollection(string $collection)
    {
        $documents = $this->firestore->collection($collection)->documents();
        $data = [];

        foreach ($documents as $doc) {
            if ($doc->exists()) {
                $data[] = array_merge(['id' => $doc->id()], $doc->data());
            }
        }

        return $data;
    }

    public function getDocument(string $collection, string $id): ?array
    {
        $doc = $this->firestore->collection($collection)->document($id)->snapshot();

        return $doc->exists() ? array_merge(['id' => $doc->id()], $doc->data()) : null;
    }

    public function updateDocument(string $collection, string $id, array $data): void
    {
        $this->firestore
            ->collection($collection)
            ->document($id)
            ->set($data, ['merge' => true]);
    }

    public function getSubcollection(
        string $collection,
        string $docId,
        string $subcollection
    ): array {
        $documents = $this->firestore
            ->collection($collection)
            ->document($docId)
            ->collection($subcollection)
            ->documents();

        return collect($documents)
            ->filter(fn($doc) => $doc->exists())
            ->map(fn($doc) => [
                'id' => $doc->id(),
                'data' => $doc->data(),
            ])
            ->values()
            ->all();
    }

    public function getSubcollectionDocument(
        string $collection,
        string $docId,
        string $subcollection,
        string $subDocId
    ): ?array {
        $snapshot = $this->firestore
            ->collection($collection)
            ->document($docId)
            ->collection($subcollection)
            ->document($subDocId)
            ->snapshot();

        return $snapshot->exists() ? $snapshot->data() : null;
    }

    public function setSubcollectionDocument(string $collection, string $id, string $subcollection, string $subid, array $data): void
    {
        $this->firestore
            ->collection($collection)
            ->document($id)
            ->collection($subcollection)
            ->document($subid)
            ->set($data, ['merge' => true]);
    }

    public function deleteAllSubcollectionDocuments(string $collection, string $docId, string $subcollection): void
    {
        $documents = $this->firestore
            ->collection($collection)
            ->document($docId)
            ->collection($subcollection)
            ->documents();

        foreach ($documents as $document) {
            if ($document->exists()) {
                $document->reference()->delete();
            }
        }
    }
}
