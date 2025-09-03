// Collaborative Study Features - Study Rooms, Quiz Battles, and Peer Learning
// Real-time collaboration for fellowship cohorts

export const CollaborativeStudy = {
  // Study room management
  studyRooms: {
    activeRooms: {},
    
    create(roomConfig) {
      const roomId = this.generateRoomId();
      const room = {
        id: roomId,
        name: roomConfig.name || `Study Room ${roomId}`,
        topic: roomConfig.topic,
        creator: roomConfig.creator,
        participants: [roomConfig.creator],
        maxParticipants: roomConfig.maxParticipants || 10,
        isPrivate: roomConfig.isPrivate || false,
        password: roomConfig.password || null,
        created: Date.now(),
        status: 'active',
        settings: {
          allowScreenShare: true,
          allowChat: true,
          allowVoice: false, // Requires additional setup
          syncedQuiz: roomConfig.syncedQuiz || false
        },
        activity: {
          currentTopic: null,
          currentQuestion: null,
          sharedNotes: [],
          chatHistory: []
        }
      };
      
      this.activeRooms[roomId] = room;
      this.broadcastRoomUpdate(roomId, 'created');
      
      return room;
    },
    
    join(roomId, userId, password = null) {
      const room = this.activeRooms[roomId];
      
      if (!room) {
        return { success: false, error: 'Room not found' };
      }
      
      if (room.participants.length >= room.maxParticipants) {
        return { success: false, error: 'Room is full' };
      }
      
      if (room.isPrivate && room.password !== password) {
        return { success: false, error: 'Invalid password' };
      }
      
      if (!room.participants.includes(userId)) {
        room.participants.push(userId);
        this.broadcastRoomUpdate(roomId, 'user_joined', userId);
      }
      
      return { success: true, room };
    },
    
    leave(roomId, userId) {
      const room = this.activeRooms[roomId];
      
      if (!room) return;
      
      room.participants = room.participants.filter(p => p !== userId);
      
      if (room.participants.length === 0) {
        // Close empty room after 5 minutes
        setTimeout(() => {
          if (room.participants.length === 0) {
            delete this.activeRooms[roomId];
          }
        }, 5 * 60 * 1000);
      } else if (room.creator === userId) {
        // Transfer ownership
        room.creator = room.participants[0];
      }
      
      this.broadcastRoomUpdate(roomId, 'user_left', userId);
    },
    
    shareScreen(roomId, userId, stream) {
      const room = this.activeRooms[roomId];
      
      if (!room || !room.participants.includes(userId)) {
        return { success: false, error: 'Not in room' };
      }
      
      if (!room.settings.allowScreenShare) {
        return { success: false, error: 'Screen sharing disabled' };
      }
      
      room.activity.screenShare = {
        userId,
        stream,
        startTime: Date.now()
      };
      
      this.broadcastRoomUpdate(roomId, 'screen_share_started', userId);
      
      return { success: true };
    },
    
    syncQuiz(roomId, questionData) {
      const room = this.activeRooms[roomId];
      
      if (!room || !room.settings.syncedQuiz) {
        return { success: false };
      }
      
      room.activity.currentQuestion = questionData;
      room.activity.responses = {};
      room.activity.questionStartTime = Date.now();
      
      this.broadcastRoomUpdate(roomId, 'quiz_question', questionData);
      
      return { success: true };
    },
    
    submitAnswer(roomId, userId, answer) {
      const room = this.activeRooms[roomId];
      
      if (!room || !room.activity.currentQuestion) {
        return { success: false };
      }
      
      if (!room.activity.responses) {
        room.activity.responses = {};
      }
      
      room.activity.responses[userId] = {
        answer,
        timeToAnswer: Date.now() - room.activity.questionStartTime
      };
      
      // Check if all participants have answered
      if (Object.keys(room.activity.responses).length === room.participants.length) {
        this.revealAnswers(roomId);
      }
      
      return { success: true };
    },
    
    revealAnswers(roomId) {
      const room = this.activeRooms[roomId];
      
      if (!room) return;
      
      const results = {
        question: room.activity.currentQuestion,
        responses: room.activity.responses,
        correctAnswer: room.activity.currentQuestion.correctAnswer,
        statistics: this.calculateRoomStatistics(room.activity.responses)
      };
      
      this.broadcastRoomUpdate(roomId, 'quiz_results', results);
      
      // Clear for next question
      room.activity.currentQuestion = null;
      room.activity.responses = {};
    },
    
    calculateRoomStatistics(responses) {
      const stats = {
        totalResponses: Object.keys(responses).length,
        averageTime: 0,
        fastestTime: Infinity,
        slowestTime: 0,
        correctCount: 0
      };
      
      let totalTime = 0;
      
      Object.values(responses).forEach(response => {
        totalTime += response.timeToAnswer;
        stats.fastestTime = Math.min(stats.fastestTime, response.timeToAnswer);
        stats.slowestTime = Math.max(stats.slowestTime, response.timeToAnswer);
        
        // Assuming we can check correctness
        if (response.correct) {
          stats.correctCount++;
        }
      });
      
      stats.averageTime = totalTime / stats.totalResponses;
      stats.accuracy = (stats.correctCount / stats.totalResponses * 100).toFixed(1);
      
      return stats;
    },
    
    addNote(roomId, userId, note) {
      const room = this.activeRooms[roomId];
      
      if (!room || !room.participants.includes(userId)) {
        return { success: false };
      }
      
      const noteEntry = {
        id: Date.now(),
        userId,
        content: note,
        timestamp: Date.now(),
        likes: [],
        comments: []
      };
      
      room.activity.sharedNotes.push(noteEntry);
      this.broadcastRoomUpdate(roomId, 'note_added', noteEntry);
      
      return { success: true, noteId: noteEntry.id };
    },
    
    generateRoomId() {
      return 'room_' + Math.random().toString(36).substr(2, 9);
    },
    
    broadcastRoomUpdate(roomId, type, data) {
      // In a real implementation, this would use WebSockets
      console.log(`Room ${roomId} update:`, type, data);
      
      // Simulate broadcast to all participants
      const room = this.activeRooms[roomId];
      if (room) {
        room.participants.forEach(userId => {
          this.sendUpdateToUser(userId, { roomId, type, data });
        });
      }
    },
    
    sendUpdateToUser(userId, update) {
      // Simulate sending update to specific user
      // In real app, would use WebSocket or WebRTC
      window.dispatchEvent(new CustomEvent('roomUpdate', {
        detail: { userId, update }
      }));
    },
    
    getRoomList() {
      return Object.values(this.activeRooms).map(room => ({
        id: room.id,
        name: room.name,
        topic: room.topic,
        participantCount: room.participants.length,
        maxParticipants: room.maxParticipants,
        isPrivate: room.isPrivate,
        status: room.status
      }));
    }
  },

  // Quiz battles
  quizBattles: {
    activeBattles: {},
    pendingChallenges: {},
    
    challenge(challengerId, opponentId, config = {}) {
      const challengeId = this.generateChallengeId();
      
      const challenge = {
        id: challengeId,
        challenger: challengerId,
        opponent: opponentId,
        topic: config.topic || 'General',
        questionCount: config.questionCount || 10,
        timeLimit: config.timeLimit || 30, // seconds per question
        created: Date.now(),
        status: 'pending',
        wager: config.wager || null // Points or badges
      };
      
      this.pendingChallenges[challengeId] = challenge;
      
      // Notify opponent
      this.notifyUser(opponentId, {
        type: 'challenge_received',
        challenge
      });
      
      // Auto-expire after 5 minutes
      setTimeout(() => {
        if (this.pendingChallenges[challengeId]) {
          this.declineChallenge(challengeId);
        }
      }, 5 * 60 * 1000);
      
      return challenge;
    },
    
    acceptChallenge(challengeId, opponentId) {
      const challenge = this.pendingChallenges[challengeId];
      
      if (!challenge || challenge.opponent !== opponentId) {
        return { success: false, error: 'Invalid challenge' };
      }
      
      delete this.pendingChallenges[challengeId];
      
      // Create battle
      const battle = {
        ...challenge,
        status: 'active',
        startTime: Date.now(),
        questions: this.generateBattleQuestions(challenge.topic, challenge.questionCount),
        currentQuestion: 0,
        scores: {
          [challenge.challenger]: { correct: 0, totalTime: 0, answers: [] },
          [challenge.opponent]: { correct: 0, totalTime: 0, answers: [] }
        }
      };
      
      this.activeBattles[challengeId] = battle;
      
      // Notify both players
      this.notifyUser(challenge.challenger, {
        type: 'battle_started',
        battle
      });
      
      this.notifyUser(challenge.opponent, {
        type: 'battle_started',
        battle
      });
      
      return { success: true, battle };
    },
    
    declineChallenge(challengeId) {
      const challenge = this.pendingChallenges[challengeId];
      
      if (!challenge) return;
      
      delete this.pendingChallenges[challengeId];
      
      this.notifyUser(challenge.challenger, {
        type: 'challenge_declined',
        challengeId
      });
    },
    
    submitBattleAnswer(battleId, userId, answer, timeToAnswer) {
      const battle = this.activeBattles[battleId];
      
      if (!battle || battle.status !== 'active') {
        return { success: false, error: 'Invalid battle' };
      }
      
      const currentQ = battle.questions[battle.currentQuestion];
      const isCorrect = answer === currentQ.correctAnswer;
      
      // Record answer
      battle.scores[userId].answers.push({
        questionIndex: battle.currentQuestion,
        answer,
        correct: isCorrect,
        timeToAnswer
      });
      
      if (isCorrect) {
        battle.scores[userId].correct++;
      }
      
      battle.scores[userId].totalTime += timeToAnswer;
      
      // Check if both answered
      const bothAnswered = 
        battle.scores[battle.challenger].answers.length > battle.currentQuestion &&
        battle.scores[battle.opponent].answers.length > battle.currentQuestion;
      
      if (bothAnswered) {
        battle.currentQuestion++;
        
        if (battle.currentQuestion >= battle.questions.length) {
          this.endBattle(battleId);
        } else {
          this.broadcastBattleUpdate(battleId, 'next_question', {
            questionIndex: battle.currentQuestion,
            question: battle.questions[battle.currentQuestion]
          });
        }
      }
      
      return { success: true, correct: isCorrect };
    },
    
    endBattle(battleId) {
      const battle = this.activeBattles[battleId];
      
      if (!battle) return;
      
      battle.status = 'completed';
      battle.endTime = Date.now();
      
      // Determine winner
      const challengerScore = battle.scores[battle.challenger];
      const opponentScore = battle.scores[battle.opponent];
      
      let winner = null;
      if (challengerScore.correct > opponentScore.correct) {
        winner = battle.challenger;
      } else if (opponentScore.correct > challengerScore.correct) {
        winner = battle.opponent;
      } else {
        // Tie breaker: faster total time
        winner = challengerScore.totalTime < opponentScore.totalTime ? 
                 battle.challenger : battle.opponent;
      }
      
      battle.winner = winner;
      
      // Update leaderboard
      this.updateLeaderboard(battle);
      
      // Notify players
      this.broadcastBattleUpdate(battleId, 'battle_ended', {
        winner,
        scores: battle.scores,
        duration: battle.endTime - battle.startTime
      });
      
      // Archive battle after 1 hour
      setTimeout(() => {
        delete this.activeBattles[battleId];
      }, 60 * 60 * 1000);
    },
    
    generateBattleQuestions(topic, count) {
      // In real implementation, would fetch from question database
      // For now, generate sample questions
      const questions = [];
      
      for (let i = 0; i < count; i++) {
        questions.push({
          id: `battle_q_${i}`,
          question: `Sample question ${i + 1} for ${topic}`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: Math.floor(Math.random() * 4),
          topic,
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)]
        });
      }
      
      return questions;
    },
    
    generateChallengeId() {
      return 'battle_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    },
    
    broadcastBattleUpdate(battleId, type, data) {
      const battle = this.activeBattles[battleId];
      
      if (!battle) return;
      
      [battle.challenger, battle.opponent].forEach(userId => {
        this.notifyUser(userId, {
          type: `battle_${type}`,
          battleId,
          data
        });
      });
    },
    
    notifyUser(userId, notification) {
      // In real app, would use push notifications or WebSocket
      window.dispatchEvent(new CustomEvent('userNotification', {
        detail: { userId, notification }
      }));
    },
    
    updateLeaderboard(battle) {
      const leaderboard = JSON.parse(localStorage.getItem('battleLeaderboard') || '{}');
      
      [battle.challenger, battle.opponent].forEach(userId => {
        if (!leaderboard[userId]) {
          leaderboard[userId] = {
            battles: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            totalCorrect: 0,
            totalQuestions: 0,
            averageTime: 0
          };
        }
        
        const stats = leaderboard[userId];
        stats.battles++;
        
        if (battle.winner === userId) {
          stats.wins++;
        } else if (battle.winner === null) {
          stats.draws++;
        } else {
          stats.losses++;
        }
        
        const userScore = battle.scores[userId];
        stats.totalCorrect += userScore.correct;
        stats.totalQuestions += battle.questions.length;
        
        // Update average time
        const avgTime = userScore.totalTime / battle.questions.length;
        stats.averageTime = (stats.averageTime * (stats.battles - 1) + avgTime) / stats.battles;
      });
      
      localStorage.setItem('battleLeaderboard', JSON.stringify(leaderboard));
    }
  },

  // Shared flashcards
  shareFlashcards: {
    publicDecks: {},
    userDecks: {},
    
    createDeck(userId, deckConfig) {
      const deckId = this.generateDeckId();
      
      const deck = {
        id: deckId,
        name: deckConfig.name,
        description: deckConfig.description,
        creator: userId,
        created: Date.now(),
        modified: Date.now(),
        isPublic: deckConfig.isPublic || false,
        category: deckConfig.category || 'General',
        tags: deckConfig.tags || [],
        cards: [],
        likes: [],
        downloads: 0,
        rating: 0,
        reviews: [],
        verified: false // Can be verified by attendings
      };
      
      if (!this.userDecks[userId]) {
        this.userDecks[userId] = {};
      }
      
      this.userDecks[userId][deckId] = deck;
      
      if (deck.isPublic) {
        this.publicDecks[deckId] = deck;
      }
      
      return deck;
    },
    
    addCard(deckId, userId, card) {
      const deck = this.userDecks[userId]?.[deckId];
      
      if (!deck || deck.creator !== userId) {
        return { success: false, error: 'Unauthorized' };
      }
      
      const cardEntry = {
        id: this.generateCardId(),
        front: card.front,
        back: card.back,
        hint: card.hint || null,
        tags: card.tags || [],
        difficulty: card.difficulty || 'Medium',
        created: Date.now(),
        statistics: {
          shown: 0,
          correct: 0,
          incorrect: 0
        }
      };
      
      deck.cards.push(cardEntry);
      deck.modified = Date.now();
      
      return { success: true, card: cardEntry };
    },
    
    likeDeck(deckId, userId) {
      const deck = this.publicDecks[deckId];
      
      if (!deck) {
        return { success: false, error: 'Deck not found' };
      }
      
      if (!deck.likes.includes(userId)) {
        deck.likes.push(userId);
        this.updateDeckRating(deckId);
      }
      
      return { success: true, likes: deck.likes.length };
    },
    
    reviewDeck(deckId, userId, review) {
      const deck = this.publicDecks[deckId];
      
      if (!deck) {
        return { success: false, error: 'Deck not found' };
      }
      
      const reviewEntry = {
        userId,
        rating: review.rating, // 1-5
        comment: review.comment,
        date: Date.now()
      };
      
      // Replace existing review if user already reviewed
      const existingIndex = deck.reviews.findIndex(r => r.userId === userId);
      if (existingIndex >= 0) {
        deck.reviews[existingIndex] = reviewEntry;
      } else {
        deck.reviews.push(reviewEntry);
      }
      
      this.updateDeckRating(deckId);
      
      return { success: true };
    },
    
    verifyDeck(deckId, attendingId) {
      const deck = this.publicDecks[deckId];
      
      if (!deck) {
        return { success: false, error: 'Deck not found' };
      }
      
      // In real app, would verify attending credentials
      deck.verified = true;
      deck.verifiedBy = attendingId;
      deck.verifiedDate = Date.now();
      
      return { success: true };
    },
    
    updateDeckRating(deckId) {
      const deck = this.publicDecks[deckId];
      
      if (!deck || deck.reviews.length === 0) return;
      
      const totalRating = deck.reviews.reduce((sum, r) => sum + r.rating, 0);
      deck.rating = (totalRating / deck.reviews.length).toFixed(1);
    },
    
    searchDecks(query, filters = {}) {
      let decks = Object.values(this.publicDecks);
      
      // Text search
      if (query) {
        const searchLower = query.toLowerCase();
        decks = decks.filter(deck => 
          deck.name.toLowerCase().includes(searchLower) ||
          deck.description.toLowerCase().includes(searchLower) ||
          deck.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      // Apply filters
      if (filters.category) {
        decks = decks.filter(deck => deck.category === filters.category);
      }
      
      if (filters.verified) {
        decks = decks.filter(deck => deck.verified);
      }
      
      if (filters.minRating) {
        decks = decks.filter(deck => deck.rating >= filters.minRating);
      }
      
      // Sort
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'popularity':
            decks.sort((a, b) => b.likes.length - a.likes.length);
            break;
          case 'rating':
            decks.sort((a, b) => b.rating - a.rating);
            break;
          case 'recent':
            decks.sort((a, b) => b.modified - a.modified);
            break;
          case 'downloads':
            decks.sort((a, b) => b.downloads - a.downloads);
            break;
        }
      }
      
      return decks;
    },
    
    downloadDeck(deckId, userId) {
      const deck = this.publicDecks[deckId];
      
      if (!deck) {
        return { success: false, error: 'Deck not found' };
      }
      
      deck.downloads++;
      
      // Clone deck for user
      const userCopy = {
        ...deck,
        id: this.generateDeckId(),
        originalId: deckId,
        downloadedFrom: deck.creator,
        downloadedDate: Date.now(),
        isPublic: false // User's copy is private by default
      };
      
      if (!this.userDecks[userId]) {
        this.userDecks[userId] = {};
      }
      
      this.userDecks[userId][userCopy.id] = userCopy;
      
      return { success: true, deck: userCopy };
    },
    
    generateDeckId() {
      return 'deck_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    },
    
    generateCardId() {
      return 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }
  },

  // Leaderboard system
  leaderboard: {
    getGlobalLeaderboard() {
      const leaderboard = JSON.parse(localStorage.getItem('battleLeaderboard') || '{}');
      
      const rankings = Object.entries(leaderboard).map(([userId, stats]) => ({
        userId,
        ...stats,
        winRate: stats.battles > 0 ? (stats.wins / stats.battles * 100).toFixed(1) : 0,
        accuracy: stats.totalQuestions > 0 ? 
          (stats.totalCorrect / stats.totalQuestions * 100).toFixed(1) : 0,
        score: this.calculateScore(stats)
      }));
      
      rankings.sort((a, b) => b.score - a.score);
      
      return rankings;
    },
    
    calculateScore(stats) {
      // Composite score based on multiple factors
      const winScore = stats.wins * 10;
      const accuracyScore = (stats.totalCorrect / Math.max(1, stats.totalQuestions)) * 100;
      const activityScore = Math.min(stats.battles * 2, 50); // Cap at 50
      const speedBonus = Math.max(0, 30 - stats.averageTime); // Bonus for fast answers
      
      return Math.round(winScore + accuracyScore + activityScore + speedBonus);
    },
    
    getUserRank(userId) {
      const rankings = this.getGlobalLeaderboard();
      const userIndex = rankings.findIndex(r => r.userId === userId);
      
      if (userIndex === -1) {
        return null;
      }
      
      return {
        rank: userIndex + 1,
        totalUsers: rankings.length,
        percentile: ((rankings.length - userIndex) / rankings.length * 100).toFixed(1),
        stats: rankings[userIndex]
      };
    }
  }
};

export default CollaborativeStudy;