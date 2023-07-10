<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api', name: 'api_')]
class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $data = [
            'code' => 403,
            'message' => 'Invalid credentials'
            ];
        $credentials = json_decode($request->getContent(), true);
        $email = $credentials['email'] ?? null;
        $password = $credentials['password'] ?? null;
        $user = $doctrine->getRepository(USER::class)->findOneBy(['email' => $email]);

        if (!$user) {
            return $this->json($data);
        }

        if (!$passwordHasher->isPasswordValid($user, $password)) {
            return $this->json($data);
        }

        $data =  [
            'code' => 200,
            'accessToken' => '123456',
            'message' => 'Success'
        ];

        return $this->json($data);
    }
}
