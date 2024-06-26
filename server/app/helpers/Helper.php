<?php

namespace App\Helpers;

use Carbon\Carbon;
use DateTime;
use Ramsey\Uuid\Type\Time;

class Helper
{
    public static function userLastActivityStatus($val): ?string
    {
        $timestamp = Carbon::parse($val);

        $lastSeenFormat = $timestamp->isToday() ? "Last seen today at {$timestamp?->format('H:i')}" : ($timestamp?->isYesterday()
            ? "Last seen yesterday at {$timestamp?->format('H:i')}"
            : "Last seen at {$timestamp?->format('d/m/Y H:i')}"
        );

        return $timestamp?->gt(now()->subSeconds(5)) ? 'Online' : $lastSeenFormat;
    }
}
